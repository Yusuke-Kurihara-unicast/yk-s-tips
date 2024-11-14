import dayjs, { OpUnitType } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ja';

export type ISOUnitType = OpUnitType | 'isoWeek';
export type Dayjs = dayjs.Dayjs;

export const getDayjs = () => {
    dayjs.locale('ja');
    dayjs.extend(weekday);
    dayjs.extend(isoWeek);
    dayjs.extend(localeData);

    // カスタムロケールを作成
    const customLocale = {
        ...dayjs.Ls.ja, // 既存の日本語ロケールをベースにする
    };
    dayjs.locale('ja-custom', customLocale);

    return dayjs;
};