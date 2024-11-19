import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { CustomProxyPlugin } from './src/CustomProxyPlugin.js';

/**
 * proxyとsvgr使った時のもの
 */
export default defineConfig(() => {

    return ({
        build: {
            outDir: 'build',// buildされたものをbuildフォルダに置く(CRAと共通にする対応
            sourcemap: 'hidden',
        },
        esbuild: { jsxInject: `import React from 'react'` }, // jsx対応
        server: {
            host: true,
            open: true,
        },
        plugins: [
            CustomProxyPlugin({// 開発環境でproxy使うための設定
                target: 'https://uchida-city-aad-api.l-gate-test01.staging.siba-service.jp',
                changeOrigin: true,
            }),
            react(),
            svgr(),
            tsconfigPaths(),
        ],
        optimizeDeps: {
            esbuildOptions: {
                loader: {
                    '.js': 'jsx',
                    '.ts': 'tsx',
                },
            },
        },
    });
});