import Phaser from 'phaser';
import { ENEMY, SPAWNER } from '../config';
import { Enemy } from '../entities/Enemy';
import type { Player } from '../entities/Player';

/** Cria inimigos fora da tela; o ritmo acelera com o tempo de jogo. */
export class EnemySpawner {
  readonly enemies: Phaser.Physics.Arcade.Group;
  private scene: Phaser.Scene;
  private player: Player;
  private nextSpawnAt = 0;
  private elapsedMs = 0;

  constructor(scene: Phaser.Scene, player: Player) {
    this.scene = scene;
    this.player = player;
    this.enemies = scene.physics.add.group({
      classType: Enemy,
      maxSize: ENEMY.maxAlive,
      runChildUpdate: false,
    });
  }

  get currentIntervalMs(): number {
    const decay = (this.elapsedMs / 1000) * SPAWNER.intervalDecayPerSecond;
    return Math.max(SPAWNER.minIntervalMs, SPAWNER.startIntervalMs - decay);
  }

  update(delta: number): void {
    this.elapsedMs += delta;

    if (this.elapsedMs >= this.nextSpawnAt) {
      this.spawnOne();
      this.nextSpawnAt = this.elapsedMs + this.currentIntervalMs;
    }

    for (const obj of this.enemies.getChildren()) {
      const enemy = obj as Enemy;
      if (enemy.active) enemy.chase(this.player);
    }
  }

  private spawnOne(): void {
    // Ponto aleatório num círculo um pouco maior que a tela, centrado no jogador.
    // (usa o tamanho da câmera / zoom, que já é válido no primeiro frame)
    const cam = this.scene.cameras.main;
    const radius =
      Math.hypot(cam.width / cam.zoom, cam.height / cam.zoom) / 2 + SPAWNER.spawnMargin;
    const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
    const x = this.player.x + Math.cos(angle) * radius;
    const y = this.player.y + Math.sin(angle) * radius;

    const enemy = this.enemies.get(x, y) as Enemy | null;
    enemy?.spawn(x, y);
  }
}
