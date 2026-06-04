import Phaser from 'phaser';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';
import { GameOverScene } from './scenes/GameOverScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#5c94fc',
  physics: {
    default: 'arcade',
    arcade: { gravity: { x: 0, y: 800 }, debug: false },
  },
  scene: [MenuScene, GameScene, GameOverScene],
};

new Phaser.Game(config);
