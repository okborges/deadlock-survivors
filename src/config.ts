/**
 * Todas as constantes de balanceamento ficam aqui.
 * Quer deixar o jogo mais fácil/difícil? Mexa só neste arquivo.
 */

export const PLAYER = {
  width: 16,
  height: 24,
  speed: 160, // pixels por segundo
  maxHp: 100,
  invulnerableMs: 500, // tempo sem tomar dano depois de ser atingido
  color: 0x4aa3ff,
} as const;

export const WEAPON = {
  fireRateMs: 300, // intervalo entre tiros automáticos
  bulletSpeed: 420,
  bulletLifespanMs: 1200,
  bulletSize: 4,
  bulletColor: 0xffe066,
  damage: 1,
  poolSize: 60, // máximo de projéteis na tela ao mesmo tempo
} as const;

export const ENEMY = {
  // Spritesheet em public/assets/sprites/enemy-sentinel.png (2 quadros de 16x20).
  sprite: 'assets/sprites/enemy-sentinel.png',
  frameWidth: 16,
  frameHeight: 20,
  walkFrameRate: 4,
  bodyWidth: 12, // hitbox menor que o desenho, para colisões mais justas
  bodyHeight: 16,
  speed: 70,
  maxHp: 3,
  contactDamage: 10,
  maxAlive: 300,
} as const;

/** Barra de vida vertical ao lado de cada inimigo. */
export const ENEMY_HP_BAR = {
  width: 2,
  height: 12,
  offsetX: 10, // distância do centro do inimigo até a barra (para a direita)
  offsetY: -4, // posição vertical do centro da barra em relação ao inimigo
  color: 0xff3030,
  backgroundColor: 0x2a0a0a,
} as const;

export const SPAWNER = {
  startIntervalMs: 900, // intervalo inicial entre inimigos
  minIntervalMs: 150, // intervalo mínimo (dificuldade máxima)
  intervalDecayPerSecond: 8, // quantos ms o intervalo diminui a cada segundo de jogo
  spawnMargin: 60, // distância extra fora da tela onde os inimigos nascem
} as const;

export const WORLD = {
  grassTileSize: 16,
} as const;

export const CAMERA = {
  zoom: 2, // 2 = cada pixel da arte vira 2x2 na tela (visual pixel art)
} as const;

/** Chaves das texturas geradas em textures.ts */
export const TEXTURES = {
  grass: 'grass',
  player: 'player',
  gun: 'gun',
  enemy: 'enemy',
  bullet: 'bullet',
} as const;

/** Chaves das animações criadas em GameScene. */
export const ANIMS = {
  enemyWalk: 'enemy-walk',
} as const;
