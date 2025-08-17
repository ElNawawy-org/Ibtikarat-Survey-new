import { JSX } from 'react';

type TProps = {
  onChange: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string;
  rtl?: boolean;
  placeholder?: string;
  label?: string;
  searchPlaceholder?: string;
  noOptions?: string;
  icon?: JSX.Element;
};

export type { TProps };
