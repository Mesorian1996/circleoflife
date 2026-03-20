import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import icon from 'astro-icon';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    icon({
      include: { lucide: ['*'] },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
