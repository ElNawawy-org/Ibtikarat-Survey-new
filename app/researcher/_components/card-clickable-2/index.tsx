/**
 * CardClickable2 is a reusable clickable card component that displays a value,
 * a label, and an optional icon. It links to the specified `href`.
 *
 * @component
 * @example
 * import { CardClickable2 } from './CardClickable2';
 * import { ClipboardIcon } from './icons';
 *
 * <CardClickable2
 *   href="/dashboard"
 *   label="Total Reports"
 *   value={12}
 *   icon={ClipboardIcon}
 * />
 */

import Link from 'next/link';
import { FC } from 'react';
import { TProps } from './type';

export const CardClickable2: FC<TProps> = ({
  href = '#',
  label,
  value,
  icon: Icon,
}) => {
  return (
    <Link
      href={href}
      className='p-4 select-none bg-white border border-grey-400 cursor-pointer hover:shadow-md'
    >
      <span className='h-full grid gap-2 grid-cols-1fr_auto items-center group-hover:hidden'>
        <span className='h-full grid content-around'>
          <span>{value}</span>

          <span>{label}</span>
        </span>

        {Icon && (
          <span className='p-2 border border-grey-600 flex justify-center items-center'>
            <Icon />
          </span>
        )}
      </span>
    </Link>
  );
};
