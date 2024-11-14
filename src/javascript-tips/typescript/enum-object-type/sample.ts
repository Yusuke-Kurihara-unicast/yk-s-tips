export const CONTENT_TYPE = {
    A: '1',
    B: '2',
    C: '3',
    D: '4',
    E: '5',
} as const;

// CONTENT_TYPEをそのまま型にしたい時
type ContentType = typeof CONTENT_TYPE[keyof typeof CONTENT_TYPE]
