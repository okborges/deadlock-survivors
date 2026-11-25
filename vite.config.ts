import { defineConfig } from 'vite';

export default defineConfig({
  // Caminhos relativos: o build funciona em qualquer host estático (ex.: GitHub Pages).
  base: './',
  server: { port: 5173 },
  // O Phaser sozinho tem ~1,3 MB; o aviso padrão de 500 kB não ajuda aqui.
  build: { chunkSizeWarningLimit: 2000 },
});
