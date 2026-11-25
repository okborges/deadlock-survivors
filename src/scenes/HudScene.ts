import Phaser from 'phaser';
import { PLAYER } from '../config';

/** Chaves do registry que a GameScene escreve e a HUD lê. */
export const HUD_KEYS = {
  hp: 'hud.hp',
  kills: 'hud.kills',
  timeMs: 'hud.timeMs',
  gameOver: 'hud.gameOver',
} as const;

/**
 * Interface por cima do jogo. Roda numa cena separada para não ser
 * afetada pelo zoom/movimento da câmera do mundo.
 */
export class HudScene extends Phaser.Scene {
  static readonly KEY = 'hud';

  private stats!: Phaser.GameObjects.Text;
  private gameOverText!: Phaser.GameObjects.Text;

  constructor() {
    super(HudScene.KEY);
  }

  create(): void {
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    };

    this.stats = this.add.text(12, 10, '', style);
    this.gameOverText = this.add
      .text(0, 0, 'GAME OVER\nclique ou aperte R para reiniciar', {
        ...style,
        fontSize: '28px',
        align: 'center',
      })
      .setOrigin(0.5)
      .setVisible(false);
  }

  update(): void {
    const hp = this.registry.get(HUD_KEYS.hp) ?? PLAYER.maxHp;
    const kills = this.registry.get(HUD_KEYS.kills) ?? 0;
    const timeMs = this.registry.get(HUD_KEYS.timeMs) ?? 0;

    const totalSec = Math.floor(timeMs / 1000);
    const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const ss = String(totalSec % 60).padStart(2, '0');

    this.stats.setText(`HP ${hp}/${PLAYER.maxHp}\nAbates ${kills}\nTempo ${mm}:${ss}`);

    this.gameOverText
      .setVisible(Boolean(this.registry.get(HUD_KEYS.gameOver)))
      .setPosition(this.scale.width / 2, this.scale.height / 2);
  }
}
