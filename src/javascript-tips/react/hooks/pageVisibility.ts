import { useEffect, useState } from 'react';

/**
 * 画面の表示状態を返す関数
 * true: 表示されている, false: 隠れている
 * @returns {boolean} 画面の表示状態
 */
export function usePageVisibility(): boolean {
    const [isVisible, setIsVisible] = useState<boolean>(document.visibilityState === 'visible');

    useEffect(() => {
        function visibilitychangeAction() {
            if (document.visibilityState === 'visible') {// 画面を再度閲覧始めた時
                setIsVisible(true);
            }

            if (document.visibilityState === 'hidden') {// 別タブに行くなどしてフォーカスが画面から外れた時
                setIsVisible(false);
            }
        };

        document.addEventListener('visibilitychange', visibilitychangeAction, false);
        return () => { document.removeEventListener('visibilitychange', visibilitychangeAction, false); };
    }, []);

    return isVisible;
};