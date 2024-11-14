import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'; // CSSモジュールの読み込み

function MyComponent({ isExpanded }) {
    const [marginClass, setMarginClass] = useState(styles.margin15);

    useEffect(() => {
        // フラグが変わるとクラスを変更してトランジションを発生させる
        setMarginClass(isExpanded ? styles.margin0 : styles.margin15);
    }, [isExpanded]);

    return (
        <div className={`${styles.container} ${marginClass}`}>
            コンテンツ
        </div>
    );
}

export default MyComponent;
