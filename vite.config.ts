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
    icons: [
      {
        src: 'favicon/crwn-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'favicon/crwn-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'favicon/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
    ],
    display: 'standalone',
    theme_color: '#317EFB',
    background_color: '#ffffff',
    orientation: 'portrait',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), VitePWA(manifestForPlugin)],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
