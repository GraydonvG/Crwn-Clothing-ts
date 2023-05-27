import { defineConfig } from 'vite';
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.icon', 'crown.svg', 'shopping-bag.svg'],
  manifest: {
    name: 'CRWN Clothing',
    short_name: 'CRWN Clothing',
    description: 'An e-commerce site for buying clothing items',
    icons: [
      {
        src: '../../assets/favicon/crwn-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '../../assets/favicon/crwn-512x512.png.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    start_url: '.',
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#ffffff',
    orientation: 'portrait',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), eslint(), VitePWA(manifestForPlugin)],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
