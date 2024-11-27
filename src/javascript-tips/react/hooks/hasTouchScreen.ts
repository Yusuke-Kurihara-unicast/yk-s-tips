import { useEffect, useState } from 'react';

export function useHasTouchScreen(): boolean {
    const [state, setState] = useState<boolean>(false);

    useEffect(() => {
        setState(hasTouchScreen());
    }, []);

    return state;
};

function hasTouchScreen(): boolean {
    if (navigator.maxTouchPoints > 0) {
        return true;
    }
    if (window.matchMedia('(pointer:coarse)').matches) {
        return true;
    }
    if ('ontouchstart' in window) {
        return true;
    }
    if ('orientation' in window) {
        return true;
    }

    return false;
};