import { build } from 'esbuild';

try {
  await build({
    entryPoints: ['server/index.ts'],
    bundle: true,
    platform: 'node',
    packages: 'external',
    format: 'esm',
    outfile: 'dist/server.js',
  });
  console.log('Build successful!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}