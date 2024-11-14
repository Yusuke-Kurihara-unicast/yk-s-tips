import {
    useRef,
    useState,
    useEffect,
} from 'react';
import DatePickerCalenderIcon from 'sample(どこかからか拾ってきて..)';
import { getDayjs } from './util';
const dayjs = getDayjs();

const MINYEAR = 1900;
const CURRENTYEAR = (new Date()).getFullYear();
const CURRENTMONTH = (new Date()).getMonth() + 1;// Dateの月は0が一月。あわせるために一度1プラス計算

/**
 * 渡された関数をnum回実行し、その結果を配列に格納してその配列を返す関数
 * @param {number} num
 * @param {function} callback
 * @returns {array}
 */
const mapToArray = (num, callback) => {
    const array = [];
    for (let i = 0; i < num; i++) {
        array.push(callback(i));
    }
    return array;
};

/**
 * 年とその年の最小月と最大月を取得
 * @param {*} year 
 * @param {number} minMonth 
 * @param {number} maxMonth 
 * @returns {Object}
 */
const getYearMonth = (year, minMonth, maxMonth) => {
    const yearMonth = typeof year === 'object' && year.year
        ? { year: year.year, month: year.month }
        : (typeof year === 'number' ? { year: year } : { year: CURRENTYEAR });
    yearMonth.minMonth = minMonth || 1;
    yearMonth.maxMonth = maxMonth || 12;
    return yearMonth;
};

/**
 * 年の配列を取得する
 * @param {*} maxYear 
 * @returns 
 */
const getYearArray = (maxYear = CURRENTYEAR, minYear = MINYEAR) => {
    let YearsByNum = (maxYear - minYear) + 1;
    if (minYear >= maxYear) {
        YearsByNum = 1;
    }
    return mapToArray(YearsByNum, i => {
        return getYearMonth(minYear + i);
    });
};

/***
 * 年月を選択するコンポーネント
 * @param {{
*     initialTerm: Moment | undefined
* }} props
* @return {JSX.Element}
*/
export const MonthDatePicker = ({
    onChange = () => { },
    className = '',
    minYear = MINYEAR,
    name = '',
    register,
    value = undefined,
}) => {
    const currentYearIndex = getYearArray(CURRENTYEAR, minYear).findIndex((item) => item.year === CURRENTYEAR);
    const [yearIndex, setYearIndex] = useState(currentYearIndex);
    const [yearArray,] = useState(getYearArray(CURRENTYEAR, minYear));
    const [rawValue, setRawValue] = useState({ year: CURRENTYEAR, month: CURRENTMONTH });
    const [open, setOpen] = useState(false);
    const pickerAreaRef = useRef(null);

    useEffect(() => {
        setRawValue({ year: value.year(), month: value.month() + 1 });
    }, [value]);

    useEffect(() => {// calendar外をクリックしたときにとじる機構
        const el = pickerAreaRef.current;
        if (!open) return;
        if (!el) return;

        // lg-month-date-picker のクラスを待たない箇所をクリックしたら閉じる（やや強引だけれど..
        const hundleClickOutside = (e) => {
            if (typeof e.target?.className !== 'string') { // SVGなどclassnameがstringで帰ってこないものに対応
                // 'lg-month-date-picker'の振られていないSVGはボタン外なので閉じる
                if (!e.target?.className?.baseVal?.includes('lg-month-date-picker')) {
                    setOpen(false);
                }
                return;
            }
            if (!e.target?.className?.includes('lg-month-date-picker')) {
                setOpen(false);
            }
        };
        document.addEventListener('click', hundleClickOutside);

        return () => document.removeEventListener('click', hundleClickOutside);
    }, [open]);

    // 前の年に
    const goPrevYear = (index) => {
        if (yearIndex > 0) {
            setYearIndex(index - 1);
        }
    };

    // 次の年に
    const goNextYear = (index) => {
        if (yearIndex < (yearArray.length - 1)) {
            setYearIndex(index + 1);
        }
    };

    const handleClickMonth = (padindex, month) => {
        const year = yearArray[padindex].year;
        const yearMonth = new Date(year, month - 1, 1); // Dateの月は0が一月.Dateで作成するために一度1引く

        setRawValue(rawValue => ({
            ...rawValue,
            year: year,
            month: month,
        }));
        onChange(dayjs(yearMonth));
    };

    const handleClickPullDown = () => {
        setOpen(open => !open);
    };

    // 月選択ボタン
    const optionPad = (padIndex, ref) => {
        const labelYear = yearArray[padIndex].year;
        const values = [];
        if (rawValue.year === labelYear) {
            rawValue.month && values.push(rawValue.month);
        }
        const yearMaxIndex = yearArray.length - 1;
        const prevButtonDisabled = yearIndex === 0;
        const nextButtonDisabled = yearIndex === yearMaxIndex;
        const atMinYear = (labelYear === yearArray[0].year);
        const atMaxYear = (labelYear === yearArray[yearMaxIndex].year);
        // 選択されている年月の「年」のページ番号
        const selectedYearIndex = yearArray.findIndex((item) => item.year === rawValue.year);

        return (
            <div key={padIndex}
                className='lg-month-date-picker w-48 absolute bg-white border z-10 p-1 rounded-md'
                ref={ref}
            >
                {/* 年と矢印ボタン */}
                <div className='lg-month-date-picker flex justify-between items-center font-bold'>
                    <button type='button'
                        className={`lg-month-date-picker py-2 pl-4 rounded-md ${prevButtonDisabled ? 'text-gray-200 hover:cursor-default' : 'text-gray-600'}`}
                        onClick={() => goPrevYear(padIndex)}
                        disabled={prevButtonDisabled}
                    >
                        {'<'}
                    </button>
                    <label className='lg-month-date-picker text-md rounded-md'>{labelYear}年</label>
                    <button type='button'
                        className={`lg-month-date-picker py-2 pr-4 rounded-md ${nextButtonDisabled ? 'text-gray-200 hover:cursor-default' : 'text-gray-600'}`}
                        disabled={nextButtonDisabled}
                        onClick={() => goNextYear(padIndex)}
                    >
                        {'>'}
                    </button>
                </div>

                {/* １〜１２月のボタン */}
                <ul className='lg-month-date-picker w-full'>
                    {mapToArray(12, i => {
                        const month = i + 1;
                        const disable =
                            (atMinYear && month < yearArray[0].min) ||
                            (atMaxYear && month > yearArray[yearMaxIndex].max) ||
                            (yearIndex === currentYearIndex && month > CURRENTMONTH);
                        return (
                            <li key={i}
                                className={`lg-month-date-picker
                                    ${(selectedYearIndex === padIndex && month === rawValue.month) ? 'bg-gray-300' : 'bg-white'}
                                    rounded-sm box-border w-1/3 float-left text-center py-2 px-3
                                `}
                            >
                                <button type='button'
                                    className={`lg-month-date-picker w-full ${disable ? 'text-gray-200 hover:cursor-default' : 'text-gray-600'}`}
                                    disabled={disable}
                                    onClick={() => { handleClickMonth(padIndex, month); }}
                                >
                                    {month}月
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    return (
        <div className='relative'>
            <div
                className={`lg-month-date-picker
                    ${className}
                    table border shadow appearance-none rounded w-full text-gray-600
                `}
            >
                <button type='button'
                    className='lg-month-date-picker p-2 flex items-center justify-between size-full'
                    onClick={handleClickPullDown}
                >
                    <label className='lg-month-date-picker px-3'>{`${rawValue.year}/${rawValue.month}`}</label>
                    <DatePickerCalenderIcon className='lg-month-date-picker' />
                </button>
                <input hidden readOnly
                    {...register}
                    value={rawValue}
                    name={name}
                />
                {open ? optionPad(yearIndex, pickerAreaRef) : undefined}
            </div>
        </div>
    );
};
