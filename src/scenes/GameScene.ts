import Phaser from 'phaser';
import { ANIMS, CAMERA, ENEMY, TEXTURES, WEAPON, WORLD } from '../config';
import type { Bullet } from '../entities/Bullet';
import type { Enemy } from '../entities/Enemy';
import { Player } from '../entities/Player';
import { AutoFire } from '../systems/AutoFire';
import { EnemyHealthBars } from '../systems/EnemyHealthBars';
import { EnemySpawner } from '../systems/EnemySpawner';
import { generatePlaceholderTextures } from '../textures';
import { HUD_KEYS, HudScene } from './HudScene';

/** Cena principal: mundo, jogador, inimigos e colisões. */
export class GameScene extends Phaser.Scene {
  static readonly KEY = 'game';

  private player!: Player;
  private autoFire!: AutoFire;
  private spawner!: EnemySpawner;
  private healthBars!: EnemyHealthBars;
  private grass!: Phaser.GameObjects.TileSprite;
  private kills = 0;
  private elapsedMs = 0;
  private isGameOver = false;

  constructor() {
    super(GameScene.KEY);
  }

  preload(): void {
    this.load.spritesheet(TEXTURES.enemy, ENEMY.sprite, {
      frameWidth: ENEMY.frameWidth,
      frameHeight: ENEMY.frameHeight,
    });
  }

  create(): void {
    if (!this.textures.exists(TEXTURES.player)) generatePlaceholderTextures(this);
    if (!this.anims.exists(ANIMS.enemyWalk)) {
      this.anims.create({
        key: ANIMS.enemyWalk,
        frames: this.anims.generateFrameNumbers(TEXTURES.enemy, { start: 0, end: 1 }),
        frameRate: ENEMY.walkFrameRate,
        repeat: -1,
      });
    }
    this.input.mouse?.disableContextMenu();

    this.kills = 0;
    this.elapsedMs = 0;
    this.isGameOver = false;

    this.grass = this.add.tileSprite(0, 0, 1, 1, TEXTURES.grass).setOrigin(0).setDepth(-100);

    this.player = new Player(this, 0, 0);
    this.cameras.main.setZoom(CAMERA.zoom).startFollow(this.player, true);

    this.autoFire = new AutoFire(this, this.player);
    this.spawner = new EnemySpawner(this, this.player);
    this.healthBars = new EnemyHealthBars(this, this.spawner.enemies);

    // Projétil acerta inimigo.
    this.physics.add.overlap(this.autoFire.bullets, this.spawner.enemies, (b, e) => {
      const bullet = b as Bullet;
      const enemy = e as Enemy;
      if (!bullet.active || !enemy.active) return;
      bullet.kill();
      if (enemy.hit(WEAPON.damage)) this.kills++;
    });

    // Inimigo encosta no jogador.
    this.physics.add.overlap(this.player, this.spawner.enemies, () => {
      if (this.player.takeDamage(ENEMY.contactDamage) && this.player.isDead) this.endGame();
    });

    // Reiniciar depois do game over.
    this.input.keyboard!.on('keydown-R', () => this.isGameOver && this.scene.restart());
    this.input.on('pointerdown', () => this.isGameOver && this.scene.restart());

    this.syncHud();
    if (!this.scene.isActive(HudScene.KEY)) this.scene.launch(HudScene.KEY);
  }

  update(_time: number, delta: number): void {
    if (this.isGameOver) return;

    this.elapsedMs += delta;
    this.player.update();
    this.spawner.update(delta);
    this.healthBars.update();
    this.updateGrass();
    this.syncHud();
  }

  /**
   * Grama "infinita": o TileSprite cobre só a área visível (com folga),
   * alinhado à grade de tiles do mundo, então os tiles nunca "deslizam".
   */
  private updateGrass(): void {
    const t = WORLD.grassTileSize;
    const view = this.cameras.main.worldView;
    const margin = t * 2; // folga para a câmera, que atualiza depois deste update
    const x = Math.floor(view.x / t) * t - margin;
    const y = Math.floor(view.y / t) * t - margin;
    this.grass.setPosition(x, y);
    this.grass.setSize(view.width + margin * 2 + t, view.height + margin * 2 + t);
  }

  private endGame(): void {
    this.isGameOver = true;
    this.physics.pause();
    this.autoFire.stop();
    this.syncHud();
  }

  private syncHud(): void {
    this.registry.set(HUD_KEYS.hp, this.player.hp);
    this.registry.set(HUD_KEYS.kills, this.kills);
    this.registry.set(HUD_KEYS.timeMs, this.elapsedMs);
    this.registry.set(HUD_KEYS.gameOver, this.isGameOver);
  }
}
