import { TProps } from './type';
import { COLORS } from './data';

export const ProgressBar = ({
  percentage = 0,
  showPercentage = false,
  lang = 'ar',
}: TProps) => {
  const progressColor =
    COLORS.find(({ limit }) => percentage <= limit)?.class ||
    'bg-secondary-green-600';

  const isRTL = lang === 'ar';

  return (
    <div className='relative bg-grey-400 min-h-7 capitalize flex'>
      <div
        className={progressColor}
        style={{ width: `${percentage}%` }}
      ></div>

      {showPercentage && (
        <p
          className={`absolute top-[60%] translate-y-[-50%] ${
            isRTL
              ? 'left-[2%] translate-x-[-2%]'
              : 'right-[2%] translate-y-[-2%]'
          }`}
        >
          {isRTL && '%'}
          {percentage}
          {!isRTL && '%'}
        </p>
      )}
    </div>
  );
};
