import { defineConfig } from 'vite';
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['crown.svg', 'shopping-bag.svg'],
  manifest: {
    name: 'CRWN Clothing',
    short_name: 'CRWN Clothing',
    description: 'An e-commerce site for buying clothing items',
    id: '/',
    icons: [
      {
        src: './icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: './icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    start_url: '.',
    theme_color: '#317EFB',
    background_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait',
  },
};

export default defineConfig({
  plugins: [react(), svgr(), VitePWA(manifestForPlugin)],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
});
