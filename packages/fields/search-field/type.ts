import { ChangeEvent } from 'react';

type TProps = {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type { TProps };
