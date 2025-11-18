import { build } from 'esbuild';
import { copyFile, mkdir } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  // Build vite.ts separately for development use only - must be first
  await build({
    entryPoints: ['server/vite.ts'],
    bundle: true,
    platform: 'node',
    packages: 'external',
    format: 'esm',
    outfile: 'dist/vite.js',
    external: [
      'vite',
      '@replit/vite-plugin-cartographer',
      '@vitejs/plugin-react',
      '@replit/vite-plugin-runtime-error-modal'
    ],
    banner: {
      js: 'import { dirname } from "path"; import { fileURLToPath } from "url"; const __dirname = dirname(fileURLToPath(import.meta.url));',
    },
    define: {
      'import.meta.dirname': '__dirname',
    },
  });

  // Build main server with vite module excluded
  await build({
    entryPoints: ['server/index.ts'],
    bundle: true,
    platform: 'node',
    packages: 'external',
    format: 'esm',
    outfile: 'dist/server.js',
    external: [
      'vite',
      '@replit/vite-plugin-cartographer',
      '@vitejs/plugin-react',
      '@replit/vite-plugin-runtime-error-modal',
      './vite',  // Exclude vite.ts module completely
      '../dist/vite.js'  // External reference to built vite module
    ],
    banner: {
      js: 'import { dirname } from "path"; import { fileURLToPath } from "url"; const __dirname = dirname(fileURLToPath(import.meta.url));',
    },
    define: {
      'import.meta.dirname': '__dirname',
    },
  });

  console.log('Build successful!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}