// ?This file will be renamed to the real purpose of it like (auth-context.tsx, modules-context.tsx, etc.)

import { useState, createContext, useContext } from 'react';
import { TProps, TResearcherCtx } from './type';

const initialState: TResearcherCtx = {
  State: true,
  setState: () => {},
};

const ResearcherCtx = createContext<TResearcherCtx>(initialState);

const ResearcherCtxProvider = ({ children }: TProps) => {
  const [State, setState] = useState(true);

  return (
    <ResearcherCtx.Provider value={{ State, setState }}>
      {children}
    </ResearcherCtx.Provider>
  );
};

const useResearcherCtx = () => {
  const ctx = useContext(ResearcherCtx);
  if (!ctx)
    throw new Error('useResearcher must be used inside ResearcherCtxProvider');
  return ctx;
};

export { ResearcherCtxProvider, useResearcherCtx };
