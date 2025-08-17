import { JSX } from 'react';

type TProps = {
  onChange: (values: string[]) => void;
  options?: { label: string; value: string }[];
  values?: string[];
  rtl?: boolean;
  placeholder?: string;
  label?: string;
  searchPlaceholder?: string;
  allOptionsSelected?: string;
  selectAll?: string;
  noOptions?: string;
  icon?: JSX.Element;
};

export type { TProps };
