import Phaser from 'phaser';
import { ENEMY, PLAYER, TEXTURES, WEAPON, WORLD } from './config';

/**
 * Gera texturas simples por código, enquanto ainda não temos pixel art.
 * Quando os sprites chegarem, basta carregá-los no preload() da cena
 * usando as mesmas chaves de TEXTURES e remover a geração daqui.
 */
export function generatePlaceholderTextures(scene: Phaser.Scene): void {
  const g = scene.make.graphics({}, false);

  // Grama: tile 16x16 com alguns pixels de tons diferentes.
  const t = WORLD.grassTileSize;
  g.fillStyle(0x3f8f3a).fillRect(0, 0, t, t);
  g.fillStyle(0x4ea345);
  for (const [x, y] of [
    [2, 3],
    [9, 1],
    [13, 7],
    [5, 11],
    [11, 13],
  ]) {
    g.fillRect(x, y, 1, 2);
  }
  g.fillStyle(0x347a30);
  for (const [x, y] of [
    [6, 5],
    [1, 9],
    [14, 12],
    [8, 14],
  ]) {
    g.fillRect(x, y, 2, 1);
  }
  g.generateTexture(TEXTURES.grass, t, t);
  g.clear();

  // Jogador: retângulo com contorno escuro.
  g.fillStyle(0x1b3a5c).fillRect(0, 0, PLAYER.width, PLAYER.height);
  g.fillStyle(PLAYER.color).fillRect(1, 1, PLAYER.width - 2, PLAYER.height - 2);
  g.generateTexture(TEXTURES.player, PLAYER.width, PLAYER.height);
  g.clear();

  // "Cano" que mostra a direção da mira.
  g.fillStyle(0xdddddd).fillRect(0, 0, 12, 3);
  g.generateTexture(TEXTURES.gun, 12, 3);
  g.clear();

  // Inimigo.
  g.fillStyle(0x5c1416).fillRect(0, 0, ENEMY.size, ENEMY.size);
  g.fillStyle(ENEMY.color).fillRect(1, 1, ENEMY.size - 2, ENEMY.size - 2);
  g.generateTexture(TEXTURES.enemy, ENEMY.size, ENEMY.size);
  g.clear();

  // Projétil.
  g.fillStyle(WEAPON.bulletColor).fillRect(0, 0, WEAPON.bulletSize, WEAPON.bulletSize);
  g.generateTexture(TEXTURES.bullet, WEAPON.bulletSize, WEAPON.bulletSize);

  g.destroy();
}
