import {
    useNavigate,
    useLocation
} from 'react-router-dom';

/**
 * クエリ文字列を Object(Key をパラメーター, Value を値として持つ) にしたものを返す
 */
export const useUrlParameters = () => {
    const navigate = useNavigate();
    const search = useLocation().search;
    const urlSearchParams = new URLSearchParams(search);
    urlSearchParams.sort();

    let paramObj = {};
    urlSearchParams.forEach((val, key) => {
        Object.assign(paramObj, { [key]: val });
    });

    /**
     * objectの内容をURLのGetパラメータとしてPushする
     * @param {*} urlParamsObj 
     */
    const pushUrl = (urlParamsObj: URLSearchParams) => {
        const urlParams = new URLSearchParams(urlParamsObj);
        navigate(`?${urlParams.toString()}`);
    };

    return [paramObj, pushUrl];
};