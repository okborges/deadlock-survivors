import Phaser from 'phaser';
import { WEAPON } from '../config';
import { Bullet } from '../entities/Bullet';
import type { Player } from '../entities/Player';

/** Dispara automaticamente na direção da mira do jogador. */
export class AutoFire {
  readonly bullets: Phaser.Physics.Arcade.Group;
  private timer: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, player: Player) {
    this.bullets = scene.physics.add.group({
      classType: Bullet,
      maxSize: WEAPON.poolSize,
      runChildUpdate: false,
    });

    this.timer = scene.time.addEvent({
      delay: WEAPON.fireRateMs,
      loop: true,
      callback: () => {
        if (player.isDead) return;
        const bullet = this.bullets.get(player.x, player.y) as Bullet | null;
        bullet?.fire(player.x, player.y, player.aimAngle);
      },
    });
  }

  stop(): void {
    this.timer.remove();
  }
}
