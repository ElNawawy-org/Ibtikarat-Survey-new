import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

type TNameContext = {
  State: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

type TProps = {
  children: ReactNode;
};

const initialState: TNameContext = {
  State: true,
  setState: () => {},
};

const NameContext = createContext<TNameContext>(initialState);

const NameContextProvider = ({ children }: TProps) => {
  const [State, setState] = useState(true);

  const value = { State, setState };

  return <NameContext.Provider value={value}>{children}</NameContext.Provider>;
};

export { NameContext, NameContextProvider };
