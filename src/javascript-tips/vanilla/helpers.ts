// ボタンなどをクリックした時、クリックした要素の下に配置されている要素でeventを発生させない
const handleClickHistory = (e) => {
    e.stopPropagation();
    onClick();
}

/**
* nullとundefindだけ判断
* @param value 
* @returns 
*/
export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
};

/**
 * 曜日の数値配列を月曜始まりにソートする条件
 */
export function weekDaySortCondition(a: number, b: number): number {
    if (a === 0) return 1; // 0は日曜なので一番最後にしたい
    if (b === 0) return -1; // 0は日曜なので一番最後にしたい
    return (a - b);
};

/***
 * 入力された文字列のバイト数を取得する
 */
export function getByteLength(str: string, targetLength: number): { length: number, endCharNum: number } {
    let length = 0;
    let prevTextNum = 0;
    let endCharNum = undefined;

    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        const regexp = /[^\\x01-\x7E]/;

        // 正規表現で全角文字を判定
        const isFullWidth = regexp.test(char);

        // 半角文字の判定
        const isHalfWidth = /[ -~｡-ﾟ]/.test(char);

        prevTextNum = i + 1;
        // 全角なら2、半角なら1を加算
        length += isFullWidth
            ? 2
            : isHalfWidth ? 1 : 0;

        // 指定した長さまでの文字数を取得する処理
        if (endCharNum === undefined) {
            if (length > targetLength) {
                endCharNum = prevTextNum;
            } else if (length === targetLength) {
                endCharNum = i + 1;
            }
        }
    }

    return { length: length, endCharNum: endCharNum };
};

/***
 * リクエストヘッダにRefererを付与してページ遷移する
 */
export function navigateToUrl(url: string, target: string) {
    const f = document.createElement('form');
    f.action = url.replace(/^http:/, 'https:');
    f.target = target;

    const indexQM = url.indexOf('?');
    if (indexQM >= 0) {
        // queryで送られるはずだった内容をinputとしてformに追加
        const params = url.substring(indexQM + 1).split('&');
        for (const param of params) {
            var keyValuePair = param.split('=');
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = keyValuePair[0];
            input.value = keyValuePair[1];
            f.appendChild(input);
        }
    }

    document.body.appendChild(f);
    f.submit();
};