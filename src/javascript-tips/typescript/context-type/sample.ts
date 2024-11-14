/**
 * createContext,useContextを利用する時の型の付与の仕方
 */

import { createContext, Dispatch, SetStateAction } from 'react';

type SearchRule = {
    page: number,
    searchParameter: SearchParameter,
};

type SearchParameter = {
    page_size?: number,
};

export const defaultSearchRule = {
    page: 1,
    searchParameter: {
        page_size: 20
    }
};

// SearchContextの型を定義
type SearchContextType = [SearchRule, Dispatch<SetStateAction<SearchRule>>];

export const SearchContext = createContext<SearchContextType | undefined>([
    defaultSearchRule,
    () => { }
]);