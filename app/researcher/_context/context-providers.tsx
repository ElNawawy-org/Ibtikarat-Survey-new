'use client';
import { ReactNode } from 'react';
import { NameContextProvider } from './name-context';

type TProps = {
  children: ReactNode;
};

export const ContextProviders = ({ children }: TProps) => {
  return <NameContextProvider>{children}</NameContextProvider>;
};
