import { JSX } from 'react';

type TProps = {
  label: string;
  value: string | number;

  icon?: () => JSX.Element;

  desc?: string;
  shadow?: boolean;
};

export type { TProps };
