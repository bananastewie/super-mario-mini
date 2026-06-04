import Phaser from 'phaser';

export class Goomba extends Phaser.Physics.Arcade.Sprite {
  isDead = false;
  private speed = 80;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'goomba');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDisplaySize(32, 32);
    (this.body as Phaser.Physics.Arcade.Body).setSize(32, 32);
    this.setVelocityX(-this.speed);
  }

  update(): void {
    if (this.isDead) return;
    const body = this.body as Phaser.Physics.Arcade.Body;
    if (body.blocked.left) this.setVelocityX(this.speed);
    else if (body.blocked.right) this.setVelocityX(-this.speed);
    this.setFlipX(body.velocity.x > 0);
  }

  stomp(): void {
    if (this.isDead) return;
    this.isDead = true;
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0, 0);
    body.enable = false;
    this.setTint(0x555555);
    this.setDisplaySize(32, 14);
    this.scene.time.delayedCall(400, () => this.destroy());
  }
}
