import { JSX } from 'react';

type TTab = {
  title: string;
  href: string;
  icon?: () => JSX.Element;
};

type TProps = {
  tabs: TTab[];
};

export type { TProps, TTab };
