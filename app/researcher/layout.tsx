import { FC, ReactNode } from 'react';
import { ContextProviders } from './_context/context-providers';

type TProps = {
  children: ReactNode;
};

const ResearcherLayout: FC<TProps> = ({ children }) => {
  return <ContextProviders>{children}</ContextProviders>;
};

export default ResearcherLayout;
