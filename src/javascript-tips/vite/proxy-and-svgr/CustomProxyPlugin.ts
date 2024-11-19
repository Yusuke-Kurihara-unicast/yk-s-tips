/**
 * Proxyを利用するために用意したやつ（利用するバッっ苦エンドサーバの切り替えのため）
 */
// import httpProxy, { type ServerOptions } from 'http-proxy';
// import type { Plugin } from 'vite';
import httpProxy from 'http-proxy';

// 参考:
// https://ja.vitejs.dev/config/server-options
// https://github.com/http-party/node-http-proxy
// https://zenn.dev/est/articles/88daae363d9032
export const CustomProxyPlugin = (options) => {
    const proxy = new httpProxy();
    return ({
        name: 'custom-proxy-server',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.headers['develop']) {// 開発環境はproxy使う
                    proxy.web(req, res, options);
                    return;
                }
                next();
            });
        }
    });
};

