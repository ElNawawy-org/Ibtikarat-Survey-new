// TODO: -elnawawy- Refactor this component

import { CircleProgress } from 'react-gradient-progress';
import { TProps } from './type';

export const ProgressCircular = ({
  percentage,
  mainColor,
  secondaryColor,
  width = 80,
  strokeWidth = 5,
  fontSize = '8',
  hidePercentageText,
}: TProps) => {
  let primaryColor: string;
  const validPercentage = Number.isFinite(Number(percentage))
    ? Number(percentage)
    : 0;

  if (percentage <= 30) {
    primaryColor = mainColor ?? '#f16565';
  } else if (percentage > 30 && percentage <= 50) {
    primaryColor = '#f9b035';
  } else {
    primaryColor = '#801E41';
  }

  return (
    <CircleProgress
      percentage={+validPercentage}
      hidePercentageText={hidePercentageText}
      fontSize={fontSize}
      strokeWidth={strokeWidth}
      width={width}
      primaryColor={[primaryColor, primaryColor]}
      secondaryColor={secondaryColor ?? '#D9D9D9'}
      fill={'none'}
    />
  );
};
