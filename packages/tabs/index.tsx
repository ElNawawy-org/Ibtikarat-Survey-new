import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TProps } from './type';

export const Tabs = ({ tabs }: TProps) => {
  const pathname = usePathname();

  const tabsList = tabs?.map(({ title, href = '', icon: Icon }) => {
    const isActive = pathname === href;
    const borderColor = isActive ? 'border-primary-600' : 'border-grey-400';

    return (
      <li
        className='flex-1'
        key={title}
      >
        <Link
          href={href}
          className={`px-2 py-4 border ${borderColor} flex gap-4 items-center justify-between`}
        >
          <span>{title}</span>

          {Icon && (
            <span className='hidden lg:inline'>
              <Icon />
            </span>
          )}
        </Link>
      </li>
    );
  });

  return (
    <ul className='list-none overflow-x-auto flex gap-1 md:gap-6 p-4 border border-grey-400'>
      {tabsList}
    </ul>
  );
};
