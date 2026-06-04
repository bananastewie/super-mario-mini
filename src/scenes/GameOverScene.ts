import Phaser from 'phaser';

interface GameOverData {
  won: boolean;
  coins: number;
}

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create(data: GameOverData): void {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, data.won ? 0x1a6e1a : 0x8b0000);

    this.add.text(width / 2, height / 2 - 100, data.won ? 'YOU WIN!' : 'GAME OVER', {
      fontSize: '60px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 10, `Coins collected: ${data.coins}`, {
      fontSize: '28px',
      color: '#ffff00',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 80, 'Press SPACE to play again', {
      fontSize: '20px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);

    this.input.keyboard!.once('keydown-SPACE', () => {
      this.scene.start('MenuScene');
    });
  }
}
