import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import icon from 'astro-icon';

export default defineConfig({
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    icon({
      include: { lucide: ['*'] },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { '@': '/Users/mesorianlimani/Documents/MES/Projekte/circleoflife/src' },
    },
  },
});
