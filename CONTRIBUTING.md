# Como contribuir

Valeu por querer ajudar! Este é um projeto de fãs, feito por diversão. Para que muita gente consiga trabalhar junta sem bagunça, seguimos algumas regras simples.

## Antes de começar

1. **Procure ou abra uma issue** descrevendo o que você quer fazer (bug, ideia, arte). Para mudanças grandes, espere um "ok" antes de gastar horas nisso — evita trabalho duplicado.
2. Issues com a label `good first issue` são boas para começar.

## Fluxo de trabalho

1. Faça um **fork** do repositório e clone o seu fork.
2. Crie uma branch a partir da `main` com um nome descritivo:
   `git checkout -b feat/inimigo-que-atira` ou `fix/colisao-projetil`
3. Faça a mudança. **Um assunto por Pull Request** — PRs pequenos são revisados rápido; PRs gigantes ficam parados.
4. Rode as checagens:
   ```bash
   npm run format
   npm run check
   ```
5. **Teste no navegador** (`npm run dev`) e jogue um pouco para ver se nada quebrou.
6. Abra o Pull Request para a `main` e preencha o template (o que mudou, como testar, print ou gif).

O CI roda `npm run check` em todo PR. PR com CI vermelho não é revisado até ficar verde.

## Padrões de código

- TypeScript em modo `strict`. Evite `any`.
- **Números de balanceamento vão em `src/config.ts`**, nunca espalhados pelo código.
- Novo inimigo, projétil ou personagem → nova classe em `src/entities/`.
- Nova mecânica que roda todo frame (armas, spawns, drops) → novo arquivo em `src/systems/`.
- Comentários e textos do jogo em português; nomes de variáveis e funções em inglês.
- Não adicione dependências novas sem discutir na issue antes.

## Pixel art e áudio

- **Só arte original.** É proibido usar sprites, ícones, sons, músicas ou imagens extraídos do jogo da Valve ou de qualquer outro jogo, e também arte de terceiros sem licença compatível.
- Inspirar-se nos personagens é ok; copiar não.
- Coloque os arquivos em `public/assets/` (ex.: `public/assets/sprites/`, `public/assets/sfx/`), em PNG (imagens) e OGG/MP3 (áudio).
- Ao enviar arte, você concorda em licenciá-la sob **CC BY-NC-SA 4.0**. Diga no PR como quer ser creditado.

## Usando IA (Claude, etc.)

Usar IA é permitido e bem-vindo. O repositório tem um [CLAUDE.md](CLAUDE.md) que ensina o Claude a seguir os padrões do projeto. Mas:

- **Você é responsável pelo que envia.** Leia o código gerado, entenda o que ele faz e teste no navegador antes de abrir o PR.
- Não abra PRs enormes gerados de uma vez só. Peça mudanças pequenas e revise cada uma.
- Não envie arte gerada a partir de imagens do jogo original.

## Revisão e merge

- Todo PR precisa de **CI verde** e **aprovação de um mantenedor**.
- O mantenedor pode pedir mudanças — não é nada pessoal, é para manter o projeto saudável.
- Usamos **"Squash and merge"**: cada PR vira um commit só na `main`.

## Conduta

Seja respeitoso. Leia o [Código de Conduta](CODE_OF_CONDUCT.md).
