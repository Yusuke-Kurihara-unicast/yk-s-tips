import { useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


/**
 * react-hook-form使用前提。増減する星マークの選択肢
 * @param param0 
 * @returns 
 */
export const StarMarkCandidate = ({
    disabled,
    evaluationScaleMax,
    name,
    register,
    watch,
}) => {
    const checkedIconValue = watch(name);
    const [hoverIconValue, setHoverIconValue] = useState(0);

    const iconClassNames = (scaleNum, checkedIconValue, hoverIconValue) => {
        const hoverIconClass = 'size-10 lg:size-12 text-lg-yellow rubberBand';
        const fillIconClass = 'size-10 lg:size-12 text-lg-yellow';
        const wireIconClass = 'size-10 lg:size-12 text-gray-300';
        const baseClass = 'first:fill-current hover:cursor-pointer';

        return (
            classNames(baseClass,
                `${hoverIconValue
                    ? hoverIconValue >= scaleNum ? hoverIconClass : wireIconClass
                    : checkedIconValue >= scaleNum ? fillIconClass : wireIconClass
                }`,
            )
        );
    };

    return (
        <div className='flex h-16 items-center'>
            {[...Array(evaluationScaleMax)].map((_, index) => {
                const scaleNum = index + 1;
                return (
                    <label key={`name-${scaleNum}`} className='mx-auto'>
                        <input name={name} hidden type='radio' value={scaleNum} {...register} disabled={disabled} />
                        <div className='pr-2 flex flex-col'
                            onMouseEnter={() => setHoverIconValue(scaleNum)}
                            onMouseLeave={() => setHoverIconValue(0)}
                        >
                            <div className='mx-auto font-bold'>{scaleNum}</div>
                            <FontAwesomeIcon icon={faStar} className={iconClassNames(scaleNum, checkedIconValue, hoverIconValue)} />
                        </div>
                    </label>
                );
            })}
        </div>
    );
};
