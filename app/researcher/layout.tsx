'use client';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';
import { ResearcherProviders } from './_context/researcher-providers';

type TProps = {
  children: ReactNode;
};

const ResearcherLayout: FC<TProps> = ({ children }) => {
  return (
    <ResearcherProviders>
      <SessionProvider>{children}</SessionProvider>
    </ResearcherProviders>
  );
};

export default ResearcherLayout;
