import Phaser from 'phaser';
import { ENEMY_HP_BAR } from '../config';
import type { Enemy } from '../entities/Enemy';

/**
 * Desenha a barra de vida vertical ao lado de cada inimigo vivo.
 * Usa um único Graphics para todos (bem mais leve que um objeto por inimigo).
 */
export class EnemyHealthBars {
  private graphics: Phaser.GameObjects.Graphics;
  private enemies: Phaser.Physics.Arcade.Group;

  constructor(scene: Phaser.Scene, enemies: Phaser.Physics.Arcade.Group) {
    this.enemies = enemies;
    this.graphics = scene.add.graphics().setDepth(20);
  }

  update(): void {
    const { width, height, offsetX, offsetY, color, backgroundColor } = ENEMY_HP_BAR;
    const g = this.graphics.clear();

    for (const obj of this.enemies.getChildren()) {
      const enemy = obj as Enemy;
      if (!enemy.active) continue;

      const x = Math.round(enemy.x + offsetX);
      const top = Math.round(enemy.y + offsetY - height / 2);
      const filled = Math.ceil((height * Math.max(0, enemy.hp)) / enemy.maxHp);

      g.fillStyle(backgroundColor).fillRect(x, top, width, height);
      // A vida "esvazia" de cima para baixo.
      g.fillStyle(color).fillRect(x, top + height - filled, width, filled);
    }
  }
}
