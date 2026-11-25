import Phaser from 'phaser';
import { PLAYER, TEXTURES } from '../config';

type MoveKeys = Record<'up' | 'down' | 'left' | 'right', Phaser.Input.Keyboard.Key>;

export class Player extends Phaser.Physics.Arcade.Sprite {
  hp: number = PLAYER.maxHp;
  /** Ângulo da mira em radianos (atualizado todo frame). */
  aimAngle = 0;

  private keys: MoveKeys;
  private gun: Phaser.GameObjects.Image;
  private invulnerableUntil = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TEXTURES.player);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(10);

    this.gun = scene.add.image(x, y, TEXTURES.gun).setOrigin(0, 0.5).setDepth(11);

    const kb = scene.input.keyboard!;
    this.keys = kb.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as MoveKeys;
  }

  get isDead(): boolean {
    return this.hp <= 0;
  }

  update(): void {
    // Movimento WASD, normalizado para a diagonal não ser mais rápida.
    const dir = new Phaser.Math.Vector2(
      Number(this.keys.right.isDown) - Number(this.keys.left.isDown),
      Number(this.keys.down.isDown) - Number(this.keys.up.isDown),
    ).normalize();
    this.setVelocity(dir.x * PLAYER.speed, dir.y * PLAYER.speed);

    // Mira: posição do mouse convertida para coordenadas do mundo.
    const pointer = this.scene.input.activePointer;
    const target = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;
    this.aimAngle = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);

    this.gun.setPosition(this.x, this.y).setRotation(this.aimAngle);
  }

  /** Aplica dano respeitando a invencibilidade temporária. Retorna true se o dano foi aplicado. */
  takeDamage(amount: number): boolean {
    const now = this.scene.time.now;
    if (this.isDead || now < this.invulnerableUntil) return false;

    this.hp = Math.max(0, this.hp - amount);
    this.invulnerableUntil = now + PLAYER.invulnerableMs;

    // Pisca enquanto está invencível.
    this.scene.tweens.add({
      targets: this,
      alpha: 0.3,
      duration: 80,
      yoyo: true,
      repeat: Math.floor(PLAYER.invulnerableMs / 160) - 1,
      onComplete: () => this.setAlpha(1),
    });
    return true;
  }
}
