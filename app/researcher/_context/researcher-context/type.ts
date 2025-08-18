import { ReactNode, Dispatch, SetStateAction } from 'react';

type TResearcherCtx = {
  State: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

type TProps = {
  children: ReactNode;
};

export type { TResearcherCtx, TProps };
