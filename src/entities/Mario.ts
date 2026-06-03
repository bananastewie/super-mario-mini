import Phaser from 'phaser';

export class Mario extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '__DEFAULT');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(32, 48);
    this.setTint(0xff0000);
    this.body!.setSize(32, 48);
    this.setCollideWorldBounds(true);
  }
}
