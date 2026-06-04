import Phaser from 'phaser';

export class Mario extends Phaser.Physics.Arcade.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private spaceKey: Phaser.Input.Keyboard.Key;
  lives = 3;
  coins = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'mario');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDisplaySize(32, 48);
    (this.body as Phaser.Physics.Arcade.Body).setSize(32, 48);
    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.spaceKey = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    const onGround = body.blocked.down;

    if (this.cursors.left.isDown) {
      this.setVelocityX(-200);
      this.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(200);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    const jumpPressed =
      Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
      Phaser.Input.Keyboard.JustDown(this.spaceKey);
    if (jumpPressed && onGround) {
      this.setVelocityY(-520);
    }

    // prevent going left past world start
    if (this.x < 16) {
      this.setX(16);
      body.setVelocityX(0);
    }
  }
}
