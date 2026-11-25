import Phaser from 'phaser';
import { ANIMS, ENEMY, TEXTURES } from '../config';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  hp: number = ENEMY.maxHp;
  readonly maxHp: number = ENEMY.maxHp;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TEXTURES.enemy);
  }

  /** Chamado ao (re)usar o inimigo a partir do pool. */
  spawn(x: number, y: number): void {
    this.hp = this.maxHp;
    this.enableBody(true, x, y, true, true);
    this.body!.setSize(ENEMY.bodyWidth, ENEMY.bodyHeight);
    // Quadro inicial aleatório para os inimigos não andarem todos em sincronia.
    this.play({ key: ANIMS.enemyWalk, startFrame: Phaser.Math.Between(0, 1) });
  }

  /** Persegue o alvo em linha reta. */
  chase(target: { x: number; y: number }): void {
    this.scene.physics.moveTo(this, target.x, target.y, ENEMY.speed);
  }

  /** Retorna true se o inimigo morreu. */
  hit(damage: number): boolean {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.disableBody(true, true);
      return true;
    }
    return false;
  }
}
