# Deadlock Survivors (fan game)

Um fan game **open source e sem fins comerciais**, no estilo "survivors" (sobreviva a hordas de inimigos com ataque automático), inspirado no universo de _Deadlock_. Roda direto no navegador e é feito em pixel art pela comunidade.

> **Aviso:** este projeto **não é afiliado, endossado ou patrocinado pela Valve Corporation**. _Deadlock_ e todas as marcas relacionadas pertencem à Valve. Este é um projeto de fãs, gratuito, sem venda, anúncios ou doações vinculadas ao jogo.

_English: a free, non-commercial, open source fan game in the "survivors" genre inspired by Valve's Deadlock. Not affiliated with Valve. Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md)._

## Como jogar

- **W A S D** — mover
- **Mouse** — mirar (o tiro é automático)
- **R** ou **clique** — reiniciar depois do game over

## Rodando localmente

Precisa do [Node.js](https://nodejs.org/) 22 ou mais novo.

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

| Comando          | O que faz                                                 |
| ---------------- | --------------------------------------------------------- |
| `npm run dev`    | Servidor de desenvolvimento com recarregamento automático |
| `npm run check`  | Checa tipos, formatação e build (o mesmo que o CI roda)   |
| `npm run format` | Formata o código automaticamente                          |
| `npm run build`  | Gera a versão final em `dist/`                            |

## Tecnologias

- [Phaser 4](https://phaser.io/) — motor de jogo 2D
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — servidor de desenvolvimento e build

## Estrutura

```
src/
  main.ts          configuração do Phaser
  config.ts        constantes de balanceamento (velocidade, dano, spawn...)
  textures.ts      texturas provisórias geradas por código
  scenes/          cenas (jogo, HUD)
  entities/        jogador, inimigos, projéteis
  systems/         sistemas de jogo (tiro automático, spawner)
public/assets/     pixel art e sons (quando existirem)
```

## Contribuindo

Toda ajuda é bem-vinda: código, pixel art, ideias, testes. Leia o [CONTRIBUTING.md](CONTRIBUTING.md) antes de abrir um Pull Request.

## Licenças

- **Código:** [MIT](LICENSE).
- **Arte e áudio originais** em `public/assets/`: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt_BR) — pode reutilizar com crédito, sem fins comerciais e mantendo a mesma licença.
- **Nunca** são aceitos sprites, sons, modelos ou imagens extraídos do jogo da Valve. Toda arte deve ser feita pelos próprios contribuidores.
