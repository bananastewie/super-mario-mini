import Phaser from 'phaser';
import { Mario } from '../entities/Mario';

export class GameScene extends Phaser.Scene {
  private mario!: Mario;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    this.physics.world.setBounds(0, 0, 3200, 600);

    const ground = this.physics.add.staticGroup();
    ground.create(1600, 584, '__DEFAULT').setDisplaySize(3200, 32).refreshBody().setTint(0x228b22);

    this.mario = new Mario(this, 100, 500);

    this.physics.add.collider(this.mario, ground);

    this.cameras.main.setBounds(0, 0, 3200, 600);
    this.cameras.main.startFollow(this.mario, true, 0.1, 0.1);
  }
}
