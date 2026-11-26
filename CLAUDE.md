# CLAUDE.md

Guia para o Claude (e outros assistentes) trabalharem neste repositório.

## O projeto

Fan game open source, sem fins comerciais, no estilo "survivors" (ondas de inimigos, ataque automático), inspirado em _Deadlock_ (Valve). Roda só no navegador. Muitos contribuidores diferentes, muitos usando IA — por isso, consistência e mudanças pequenas importam mais que tudo.

## Stack

- Phaser 4 (Arcade Physics), TypeScript `strict`, Vite. Sem framework de UI.
- `npm run dev` — servidor local (http://localhost:5173)
- `npm run check` — typecheck + prettier + build. **Rode antes de considerar qualquer tarefa pronta.**
- `npm run format` — formata com Prettier.

## Estrutura

- `src/main.ts` — configuração do `Phaser.Game` e lista de cenas.
- `src/config.ts` — **todas** as constantes de balanceamento e chaves de textura.
- `src/textures.ts` — texturas provisórias geradas por código (serão substituídas por pixel art com as mesmas chaves).
- `src/scenes/GameScene.ts` — mundo, colisões, game over. `src/scenes/HudScene.ts` — interface, lê dados do `registry` (chaves em `HUD_KEYS`).
- `src/entities/` — uma classe por tipo de objeto (`Player`, `Enemy`, `Bullet`), estendendo `Phaser.Physics.Arcade.Sprite`.
- `src/systems/` — lógica que roda por frame ou por timer (`AutoFire`, `EnemySpawner`, `EnemyHealthBars`).
- `public/assets/sprites/` — pixel art real (PNG). Spritesheets são carregados no `preload()` da `GameScene`, com caminho e tamanho de quadro em `src/config.ts`.

## Regras

1. **Mudanças pequenas e focadas.** Faça só o que a tarefa pede; não refatore código não relacionado.
2. **Números de gameplay vão em `src/config.ts`**, nunca hardcoded em entidades ou cenas.
3. Objetos que aparecem muito (inimigos, projéteis) usam **pool** via `physics.add.group({ classType, maxSize })` + `group.get()`, e são desativados com `disableBody(true, true)`, não destruídos.
4. Novo inimigo/projétil/personagem → nova classe em `src/entities/`. Nova mecânica → novo arquivo em `src/systems/`. Evite crescer `GameScene.ts`.
5. HUD/interface fica na `HudScene` (sem zoom da câmera). Comunicação entre cenas via `this.registry`.
6. Não adicione dependências npm sem o usuário pedir explicitamente.
7. **Nunca** use, baixe ou referencie assets (sprites, sons, imagens) do jogo da Valve. Só arte original em `public/assets/`.
   Personagens seguem o padrão visual do `CONTRIBUTING.md`: estilo "tiny" (chibi), quadros de **16x16** desenhados em 1x (sem `setScale`), spritesheet em linha horizontal. Quantidade de quadros e duração (ms) de cada animação vão em `src/config.ts`.
8. Comentários e textos visíveis no jogo em português; identificadores em inglês.
9. Sem `any`. Prefira tipos explícitos nas fronteiras públicas das classes.

## Depuração

Em modo dev, a instância do jogo fica em `window.game` (ex.: `game.scene.getScene('game')` no console).

## Ao terminar

- `npm run check` passando.
- Testar no navegador: mover com WASD, mirar com o mouse, inimigos morrendo, game over e reinício com R.
- Resumir para o usuário o que mudou e como testar — isso vai para a descrição do PR.
