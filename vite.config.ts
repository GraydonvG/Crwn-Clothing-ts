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
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), VitePWA(manifestForPlugin)],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
