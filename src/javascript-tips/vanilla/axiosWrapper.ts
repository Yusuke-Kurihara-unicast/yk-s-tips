/**
 * axiosあんま使わないかもだけど..
 */

import axios, { AxiosHeaders } from 'axios';

const developmentHeaderObj = {// 開発環境を判断するヘッダーを埋め込む
    ...(import.meta.env.DEV) ? { 'develop': 'true' } : {}
};

const headers = new AxiosHeaders({
    'Content-Type': 'application/json',
    ...developmentHeaderObj
})

const externalServiceHeaders = new AxiosHeaders({
    ...developmentHeaderObj
})

const apiAccess = axios.create({ baseURL: '/' });
apiAccess.interceptors.request.use((config) => {
    config.headers = headers;
    config.timeout = 30000;
    config.responseType = 'json';
    config.baseURL = '/';
    config.withCredentials = true;
    return config;
}, (error) => {
    return Promise.reject(error);
});

const apiExternalServiceAccess = axios.create({});
apiExternalServiceAccess.interceptors.request.use((config) => {
    config.headers = externalServiceHeaders;
    config.baseURL = '/';
    config.timeout = 3000;
    return config;
}, (error) => {
    return Promise.reject(error);
});

export { apiAccess, apiExternalServiceAccess };
