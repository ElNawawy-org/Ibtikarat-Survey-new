import { JSX } from 'react';

type TProps = {
  href: string;
  label: string;
  value: string | number;

  icon?: () => JSX.Element;
};

export type { TProps };
