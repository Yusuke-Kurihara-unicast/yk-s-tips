/// <reference types="vite/client" />
/// <reference path="./index.tsx" /> 

// svgをリアクトコンポーネントとして使う時用の記述
declare module "*.svg?react" {
    import { FunctionComponent, SVGAttributes } from "react";
    const content: FunctionComponent<SVGAttributes<SVGElement>>;
    export default content;
}
/**
 * 以下のように記述する
 * import AlertSVG from 'assets/icon/alert.svg?react';
 * <AlertSVG />
 */