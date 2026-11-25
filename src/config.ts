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
  size: 10,
  speed: 70,
  maxHp: 1,
  contactDamage: 10,
  color: 0xe5484d,
  maxAlive: 300,
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
