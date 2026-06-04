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

    // ── Penguin Mario (32×48) ──────────────────────────────────────────────
    // feet
    g.fillStyle(0xff8800); g.fillRect(2, 42, 12, 6); g.fillRect(18, 42, 12, 6);
    // body — black
    g.fillStyle(0x111122); g.fillEllipse(16, 30, 28, 30);
    // white belly
    g.fillStyle(0xffffff); g.fillEllipse(16, 32, 16, 20);
    // flipper arms
    g.fillStyle(0x111122); g.fillEllipse(4, 28, 10, 18); g.fillEllipse(28, 28, 10, 18);
    // head — black
    g.fillStyle(0x111122); g.fillCircle(16, 12, 12);
    // white face patch
    g.fillStyle(0xffffff); g.fillEllipse(16, 14, 13, 11);
    // eyes
    g.fillStyle(0xffffff); g.fillCircle(12, 9, 3); g.fillCircle(20, 9, 3);
    g.fillStyle(0x111122); g.fillCircle(13, 9, 2); g.fillCircle(21, 9, 2);
    g.fillStyle(0xffffff); g.fillCircle(14, 8, 1); g.fillCircle(22, 8, 1);
    // beak
    g.fillStyle(0xff8800); g.fillTriangle(12, 14, 20, 14, 16, 19);
    // blue scarf
    g.fillStyle(0x2255ff); g.fillRect(6, 20, 20, 4);
    g.generateTexture('mario', 32, 48);
    g.clear();

    // ── Goomba: angry mushroom (32×32) ─────────────────────────────────────
    // cap — dark red with spots
    g.fillStyle(0xcc2200); g.fillEllipse(16, 10, 30, 18);
    g.fillStyle(0xffffff); g.fillCircle(10, 8, 3); g.fillCircle(22, 7, 2); g.fillCircle(18, 13, 2);
    // body — beige
    g.fillStyle(0xd4a070); g.fillRect(4, 16, 24, 14);
    g.fillStyle(0xd4a070); g.fillEllipse(16, 17, 26, 8);
    // angry eyes
    g.fillStyle(0xffffff); g.fillCircle(10, 18, 4); g.fillCircle(22, 18, 4);
    g.fillStyle(0x111111); g.fillCircle(11, 19, 2); g.fillCircle(23, 19, 2);
    // eyebrow frown
    g.fillStyle(0x111111); g.fillRect(6, 14, 8, 2); g.fillRect(18, 14, 8, 2);
    // feet
    g.fillStyle(0x8b4513); g.fillRect(4, 28, 10, 4); g.fillRect(18, 28, 10, 4);
    g.generateTexture('goomba', 32, 32);
    g.clear();

    // ── Coin: shiny gold (16×16) ────────────────────────────────────────────
    g.fillStyle(0xffd700); g.fillCircle(8, 8, 8);
    g.fillStyle(0xffe866); g.fillCircle(6, 6, 4);
    g.fillStyle(0xcc9900); g.fillCircle(10, 10, 3);
    g.fillStyle(0xffee99); g.fillCircle(5, 5, 2);
    g.generateTexture('coin', 16, 16);
    g.clear();

    // ── Ground tile (32×32) — grass top, dirt body ──────────────────────────
    // dirt
    g.fillStyle(0x8b5e2a); g.fillRect(0, 0, 32, 32);
    // dirt texture specks
    g.fillStyle(0x7a5020); g.fillRect(4, 10, 4, 3); g.fillRect(16, 18, 5, 3); g.fillRect(24, 8, 3, 4);
    g.fillStyle(0xa07040); g.fillRect(8, 20, 3, 3); g.fillRect(20, 12, 4, 2);
    // grass layer
    g.fillStyle(0x2ecc40); g.fillRect(0, 0, 32, 8);
    // grass highlight
    g.fillStyle(0x55ee55); g.fillRect(0, 0, 32, 3);
    // grass blades
    g.fillStyle(0x22aa30);
    g.fillRect(4, 2, 2, 4); g.fillRect(10, 1, 2, 5); g.fillRect(18, 2, 2, 4); g.fillRect(26, 1, 2, 5);
    // tile border
    g.lineStyle(1, 0x5a3a10, 0.4); g.strokeRect(0, 0, 32, 32);
    g.generateTexture('ground', 32, 32);
    g.clear();

    // ── Platform tile (32×16) — brick ───────────────────────────────────────
    g.fillStyle(0xb05020); g.fillRect(0, 0, 32, 16);
    // mortar lines
    g.fillStyle(0xd4956a); g.fillRect(1, 1, 14, 6); g.fillRect(17, 1, 14, 6);
    g.fillStyle(0xd4956a); g.fillRect(1, 9, 30, 6);
    // highlight top edge
    g.fillStyle(0xe8a882); g.fillRect(1, 1, 14, 2); g.fillRect(17, 1, 14, 2);
    g.fillStyle(0xe8a882); g.fillRect(1, 9, 30, 2);
    // shadow
    g.fillStyle(0x7a3010); g.fillRect(0, 14, 32, 2);
    g.generateTexture('platform', 32, 16);
    g.clear();

    // ── Flag pole (60×120) ──────────────────────────────────────────────────
    // pole
    g.fillStyle(0xcccccc); g.fillRect(13, 0, 5, 120);
    g.fillStyle(0xeeeeee); g.fillRect(14, 0, 2, 120);
    // flag
    g.fillStyle(0xff2200); g.fillRect(18, 4, 30, 14);
    g.fillStyle(0xffffff); g.fillRect(18, 18, 30, 14);
    g.fillStyle(0xff2200); g.fillRect(18, 32, 30, 8);
    // pole top ball
    g.fillStyle(0xffdd00); g.fillCircle(15, 3, 5);
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
