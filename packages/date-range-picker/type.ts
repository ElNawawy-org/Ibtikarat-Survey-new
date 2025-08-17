import { JSX } from 'react';

type TDateRange = {
  startDate: Date | undefined | null;
  endDate: Date | undefined | null;
};

type TProps = {
  range: TDateRange;
  onChange: (dateRange: TDateRange) => void;
  label: string;
  placeholder: string;
  clearTitle: string;
  calendarIcon?: JSX.Element;
  nextIcon?: JSX.Element;
  previousIcon?: JSX.Element;
};

export type { TProps, TDateRange };
