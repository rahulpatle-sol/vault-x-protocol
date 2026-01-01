import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-packages-polyfill-core';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE_URL || '/';

  return {
    base,

    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_PORT || 5173),
      strictPort: false,
      open: false,
      cors: true,
      allowedHosts: true,
      hmr: {
        clientPort: Number(env.VITE_HMR_CLIENT_PORT || 443),
      },
    },

    preview: {
      host: '0.0.0.0',
      port: Number(env.VITE_PREVIEW_PORT || 4173),
      strictPort: false,
      allowedHosts: true,
    },

    plugins: [
      react({
        jsxImportSource: 'react',
        tsDecorators: true,
        swcOptions: {
          jsc: {
            transform: {
              react: { runtime: 'automatic' },
            },
          },
        },
      }),
    ],

    define: {
      'process.env': {
        VITE_DCL_DEFAULT_ENV: env.VITE_DCL_DEFAULT_ENV,
        VITE_BASE_URL: base,
      },
      global: 'globalThis',
    },

    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({ process: true, buffer: true }),
        ],
      },
    },

    resolve: {
      alias: {
        '@web3-react/core': fileURLToPath(new URL('./src/web3/Web3ReactCompat.jsx', import.meta.url)),
        'react-moralis': fileURLToPath(new URL('./src/web3/ReactMoralisCompat.jsx', import.meta.url)),
        'react-dom/client': fileURLToPath(new URL('./src/web3/ReactDomClientCompat.jsx', import.meta.url)),

        assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
        components: fileURLToPath(new URL('./src/components', import.meta.url)),
        containers: fileURLToPath(new URL('./src/containers', import.meta.url)),
        contracts: fileURLToPath(new URL('./src/contracts', import.meta.url)),
        helpers: fileURLToPath(new URL('./src/helpers', import.meta.url)),
        hooks: fileURLToPath(new URL('./src/hooks', import.meta.url)),
        providers: fileURLToPath(new URL('./src/providers', import.meta.url)),
      },
    },

    build: {
      sourcemap: false,
      rollupOptions: {
        plugins: [nodePolyfills()],
      },
    },
  };
});
