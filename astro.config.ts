import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: 'passthrough',
  }),
  integrations: [
    icon({
      include: { lucide: ['*'] },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['node:async_hooks'],
    },
    optimizeDeps: {
      exclude: ['resend', 'audit-ZNXLMFSS'],  
    },
  },
});