import Link from 'next/link';
import { TProps } from './type';
import { EyeIcon } from './eye-icon';

export const ShowDetails = ({ href, title }: TProps) => {
  return (
    <Link href={href}>
      <span className='grid justify-items-center gap-1 cursor-pointer hover:opacity-70'>
        <EyeIcon />

        <span>{title}</span>
      </span>
    </Link>
  );
};
