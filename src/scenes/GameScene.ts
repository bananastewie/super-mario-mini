import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    this.add.text(400, 300, 'Super Mario Mini', {
      fontSize: '32px',
      color: '#ffffff',
    }).setOrigin(0.5);
  }
}
