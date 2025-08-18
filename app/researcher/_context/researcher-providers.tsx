// ? If we get providers other than context, we will move the <ResearcherProviders> component to an upper level
// ? and let this file to the context providers only

'use client';
import { ReactNode } from 'react';
import { ResearcherCtxProvider } from './researcher-context';

type TProps = {
  children: ReactNode;
};

export const ResearcherProviders = ({ children }: TProps) => {
  return <ResearcherCtxProvider>{children}</ResearcherCtxProvider>;
};
