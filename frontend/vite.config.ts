import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@fluentui/react-charting')) {
            return 'fluentui-charts'; // Separate chunk for FluentUI charts
          }
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['@fluentui/react-charting'],
  },
  ssr: {
    noExternal: ['@fluentui/react-charting'],
  },
});
