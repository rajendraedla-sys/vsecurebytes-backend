import { build } from 'esbuild';

try {
  await build({
    entryPoints: ['server/index.ts'],
    bundle: true,
    platform: 'node',
    packages: 'external',
    format: 'esm',
    outfile: 'dist/server.js',
    external: ['vite', '@replit/vite-plugin-cartographer', '@vitejs/plugin-react', '@replit/vite-plugin-runtime-error-modal'],
  });
  console.log('Build successful!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}