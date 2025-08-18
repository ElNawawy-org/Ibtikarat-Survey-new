import { FC, ReactNode } from 'react';
import { ResearcherProviders } from './_context/researcher-providers';

type TProps = {
  children: ReactNode;
};

const ResearcherLayout: FC<TProps> = ({ children }) => {
  return <ResearcherProviders>{children}</ResearcherProviders>;
};

export default ResearcherLayout;
