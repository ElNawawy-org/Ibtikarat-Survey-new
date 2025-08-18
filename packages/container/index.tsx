import { TProps } from './type';

export const Container = ({ children }: TProps) => {
  // This component shrinks when it does not have a full width class, which is not right.
  // TODO-tsx: fix this issue
  return <div className='w-full'>{children}</div>;
};
