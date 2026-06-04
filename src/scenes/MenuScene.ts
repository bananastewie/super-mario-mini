import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x5c94fc);

    this.add.text(width / 2, height / 2 - 100, 'SUPER MARIO MINI', {
      fontSize: '48px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 10, 'Press SPACE to Start', {
      fontSize: '26px',
      color: '#ffff00',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 80, 'Arrow Keys: Move    SPACE / Up: Jump', {
      fontSize: '18px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);

    this.input.keyboard!.once('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }
}
