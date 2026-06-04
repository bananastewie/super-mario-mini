import Phaser from 'phaser';
import { Mario } from '../entities/Mario';
import { Goomba } from '../entities/Goomba';

const WORLD_W = 4000;
const WORLD_H = 600;

export class GameScene extends Phaser.Scene {
  private mario!: Mario;
  private goombas!: Phaser.Physics.Arcade.Group;
  private coins!: Phaser.Physics.Arcade.StaticGroup;
  private ground!: Phaser.Physics.Arcade.StaticGroup;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;

  private flagZone!: Phaser.GameObjects.Zone;
  private livesText!: Phaser.GameObjects.Text;
  private coinsText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;
  private timeLeft = 300;
  private timerEvent!: Phaser.Time.TimerEvent;

  private isDead = false;
  private hasWon = false;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    this.makeTextures();
  }

  private makeTextures(): void {
    const g = this.make.graphics({});

    // Mario: red cap + blue overalls
    g.fillStyle(0xff2200); g.fillRect(0, 0, 32, 48);
    g.fillStyle(0x0033cc); g.fillRect(2, 24, 28, 24);
    g.fillStyle(0xffcc88); g.fillRect(6, 6, 20, 16);
    g.fillStyle(0xff2200); g.fillRect(4, 0, 24, 10); // cap brim
    g.generateTexture('mario', 32, 48);
    g.clear();

    // Goomba: brown oval body
    g.fillStyle(0x8b4513); g.fillRect(0, 6, 32, 26);
    g.fillStyle(0x8b4513); g.fillEllipse(16, 12, 32, 18);
    g.fillStyle(0xffcc88); g.fillRect(3, 18, 10, 8);
    g.fillStyle(0xffcc88); g.fillRect(19, 18, 10, 8);
    g.generateTexture('goomba', 32, 32);
    g.clear();

    // Coin: gold circle
    g.fillStyle(0xffd700); g.fillCircle(8, 8, 8);
    g.fillStyle(0xffaa00); g.fillCircle(8, 8, 5);
    g.generateTexture('coin', 16, 16);
    g.clear();

    // Ground tile: green top, brown body
    g.fillStyle(0x228b22); g.fillRect(0, 0, 32, 8);
    g.fillStyle(0x8b4513); g.fillRect(0, 8, 32, 24);
    g.fillStyle(0x196b19); g.fillRect(0, 0, 32, 4);
    g.generateTexture('ground', 32, 32);
    g.clear();

    // Platform tile: brick yellow
    g.fillStyle(0xc8a000); g.fillRect(0, 0, 32, 16);
    g.fillStyle(0xffe040); g.fillRect(2, 2, 28, 5);
    g.fillStyle(0xa07800); g.fillRect(0, 0, 1, 16);
    g.fillStyle(0xa07800); g.fillRect(31, 0, 1, 16);
    g.generateTexture('platform', 32, 16);
    g.clear();

    // Flag pole + flag
    g.fillStyle(0xaaaaaa); g.fillRect(12, 0, 6, 120);
    g.fillStyle(0xff0000); g.fillTriangle(18, 4, 18, 44, 54, 24);
    g.generateTexture('flagpole', 60, 120);

    g.destroy();
  }

  create(): void {
    this.physics.world.setBounds(0, -300, WORLD_W, WORLD_H + 600);
    this.isDead = false;
    this.hasWon = false;
    this.timeLeft = 300;

    // Sky background
    this.add.rectangle(WORLD_W / 2, WORLD_H / 2, WORLD_W, WORLD_H, 0x5c94fc);

    this.buildLevel();

    this.mario = new Mario(this, 100, 500);
    this.setupCollisions();
    this.createHUD();

    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.startFollow(this.mario, true, 0.1, 0.1);

    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.isDead || this.hasWon) return;
        this.timeLeft = Math.max(0, this.timeLeft - 1);
        this.timerText.setText(`TIME ${this.timeLeft}`);
        if (this.timeLeft === 0) this.hurtMario();
      },
      loop: true,
    });
  }

  private buildLevel(): void {
    this.ground = this.physics.add.staticGroup();
    this.platforms = this.physics.add.staticGroup();
    this.coins = this.physics.add.staticGroup();
    this.goombas = this.physics.add.group();

    // Ground segments — gaps at 700-900, 1450-1650, 2300-2500, 3100-3300
    const groundSegs = [
      [0, 700], [900, 550], [1650, 650], [2500, 600], [3300, 700],
    ] as [number, number][];

    for (const [start, len] of groundSegs) {
      for (let x = start; x < start + len; x += 32) {
        this.ground.create(x + 16, 584, 'ground').setDisplaySize(32, 32).refreshBody();
      }
    }

    // Platforms [centerX, y, widthInTiles]
    const platDefs = [
      [250, 440, 4], [480, 360, 4], [650, 460, 3],
      [1000, 400, 5], [1150, 300, 4], [1400, 440, 3],
      [1800, 380, 5], [2000, 280, 4], [2200, 440, 4],
      [2650, 400, 5], [2850, 300, 4], [3000, 440, 4],
      [3450, 380, 5], [3650, 280, 4], [3850, 400, 4],
    ] as [number, number, number][];

    for (const [cx, py, tiles] of platDefs) {
      const w = tiles * 32;
      for (let x = cx - w / 2; x < cx + w / 2; x += 32) {
        this.platforms.create(x + 16, py, 'platform').setDisplaySize(32, 16).refreshBody();
      }
    }

    // Coins
    const coinDefs: [number, number][] = [
      [218, 400], [250, 400], [282, 400],
      [448, 320], [480, 320], [512, 320],
      [968, 360], [1000, 360], [1032, 360], [1064, 360],
      [1118, 260], [1150, 260], [1182, 260],
      [1768, 340], [1800, 340], [1832, 340], [1864, 340],
      [1968, 240], [2000, 240], [2032, 240],
      [2618, 360], [2650, 360], [2682, 360],
      [2818, 260], [2850, 260],
      [3418, 340], [3450, 340], [3482, 340],
      [3618, 240], [3650, 240], [3682, 240],
    ];

    for (const [cx, cy] of coinDefs) {
      this.coins.create(cx, cy, 'coin').setDisplaySize(16, 16).refreshBody();
    }

    // Goombas [x, y]
    const goombaDefs: [number, number][] = [
      [350, 540], [600, 540],
      [1050, 540], [1300, 540],
      [1850, 540], [2150, 540],
      [2700, 540], [2950, 540],
      [3500, 540], [3750, 540],
    ];

    for (const [gx, gy] of goombaDefs) {
      const g = new Goomba(this, gx, gy);
      this.goombas.add(g);
      this.physics.add.collider(g, this.ground);
      this.physics.add.collider(g, this.platforms);
    }

    // Goal flag
    this.add.image(3940, 464, 'flagpole').setOrigin(0.5, 1).setDepth(1);
    this.flagZone = this.add.zone(3940, 300, 64, 600);
    this.physics.add.existing(this.flagZone, true);
  }

  private setupCollisions(): void {
    this.physics.add.collider(this.mario, this.ground);
    this.physics.add.collider(this.mario, this.platforms);

    this.physics.add.overlap(this.mario, this.coins, (_m, coin) => {
      (coin as Phaser.GameObjects.GameObject).destroy();
      this.mario.coins++;
      this.coinsText.setText(`COINS  ${this.mario.coins}`);
    });

    this.physics.add.overlap(this.mario, this.goombas, (_m, gObj) => {
      const goomba = gObj as Goomba;
      if (goomba.isDead) return;
      const mBody = this.mario.body as Phaser.Physics.Arcade.Body;
      if (mBody.velocity.y > 50 && this.mario.y < goomba.y - 8) {
        goomba.stomp();
        this.mario.setVelocityY(-340);
        this.mario.coins++;
        this.coinsText.setText(`COINS  ${this.mario.coins}`);
      } else {
        this.hurtMario();
      }
    });

    this.physics.add.overlap(this.mario, this.flagZone, () => this.winGame());
  }

  private createHUD(): void {
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '22px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      fontFamily: 'monospace',
    };
    this.livesText = this.add.text(16, 12, `LIVES  ${this.mario.lives}`, style)
      .setScrollFactor(0).setDepth(20);
    this.coinsText = this.add.text(16, 42, `COINS  ${this.mario.coins}`, style)
      .setScrollFactor(0).setDepth(20);
    this.timerText = this.add.text(600, 12, `TIME ${this.timeLeft}`, style)
      .setScrollFactor(0).setDepth(20);
  }

  private hurtMario(): void {
    if (this.isDead) return;
    this.isDead = true;
    this.mario.lives--;
    this.livesText.setText(`LIVES  ${this.mario.lives}`);
    this.cameras.main.shake(300, 0.01);

    if (this.mario.lives <= 0) {
      this.time.delayedCall(1500, () => {
        this.timerEvent.destroy();
        this.scene.start('GameOverScene', { won: false, coins: this.mario.coins });
      });
    } else {
      this.mario.setAlpha(0.4);
      this.time.delayedCall(1200, () => {
        this.mario.setPosition(100, 500);
        (this.mario.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
        this.mario.setAlpha(1);
        this.isDead = false;
        this.timeLeft = 300;
        this.timerText.setText(`TIME ${this.timeLeft}`);
      });
    }
  }

  private winGame(): void {
    if (this.hasWon) return;
    this.hasWon = true;
    this.mario.setVelocity(0, 0);
    (this.mario.body as Phaser.Physics.Arcade.Body).enable = false;
    this.cameras.main.flash(500, 255, 255, 100);
    this.time.delayedCall(1800, () => {
      this.timerEvent.destroy();
      this.scene.start('GameOverScene', { won: true, coins: this.mario.coins });
    });
  }

  update(): void {
    if (!this.isDead && !this.hasWon) {
      this.mario.update();
    }

    this.goombas.getChildren().forEach(g => (g as Goomba).update());

    // Pit death
    if (!this.isDead && !this.hasWon && this.mario.y > WORLD_H + 60) {
      this.hurtMario();
    }
  }
}
