import {
    useLayoutEffect,
    useState,
} from 'react';

// 画面サイズを取得する
export const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
};
