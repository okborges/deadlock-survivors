import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene';
import { HudScene } from './scenes/HudScene';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#111111',
  pixelArt: true, // sem suavização: pixels nítidos
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  scene: [GameScene, HudScene],
});

// Só em desenvolvimento: acesse `window.game` no console do navegador para depurar.
if (import.meta.env.DEV) {
  (window as unknown as { game: Phaser.Game }).game = game;
}
