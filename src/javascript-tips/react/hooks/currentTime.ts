import { useEffect, useState } from 'react';

/**
 * 現在時刻を指定された間隔で返すhooks
 * @param {number} interval 何ミリ秒毎に現在時を返すかの値
 * @returns 
 */
export const useCurrentTime = (interval: number = 1000): number => {
    const now = new Date(); // 初期値用
    const [currentTime, setCurrentTime] = useState(Number(now.toLocaleTimeString('ja-JP').replaceAll(':', '')));

    useEffect(() => {
        const timeoutId = setInterval(
            () => {
                const now = new Date();
                const time = Number(now.toLocaleTimeString('ja-JP').replaceAll(':', ''));
                setCurrentTime(time);
            },
            interval
        );
        return () => { clearTimeout(timeoutId); };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return currentTime;
};