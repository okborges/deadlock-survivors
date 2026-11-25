import Phaser from 'phaser';
import { TEXTURES, WEAPON } from '../config';

export class Bullet extends Phaser.Physics.Arcade.Sprite {
  private expiresAt = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TEXTURES.bullet);
  }

  fire(x: number, y: number, angle: number): void {
    this.enableBody(true, x, y, true, true);
    this.setRotation(angle);
    this.scene.physics.velocityFromRotation(angle, WEAPON.bulletSpeed, this.body!.velocity);
    this.expiresAt = this.scene.time.now + WEAPON.bulletLifespanMs;
  }

  kill(): void {
    this.disableBody(true, true);
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    if (this.active && time >= this.expiresAt) this.kill();
  }
}
