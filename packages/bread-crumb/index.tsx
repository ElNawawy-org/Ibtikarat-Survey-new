import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { TProps } from './type';
import { ArrowBackIcon } from './arrow-back-icon';
import { ArrowBreadCrumbIcon } from './arrow-bread-crumb-icon';

export const BreadCrumb: FC<TProps> = ({
  links = [],
  dataTest,
  lang = 'ar',
}) => {
  const { back } = useRouter();

  const linksList = links.map(({ title, href = '#' }, index) => {
    const isLastLink = links.length - 1 === index;
    const linkColor = isLastLink ? 'text-black' : 'text-grey-500';
    const cursorStyle = isLastLink ? 'cursor-default' : '';
    const isRTL = lang === 'ar';

    return (
      <div
        key={title}
        className='flex items-center gap-2'
      >
        <Link
          className={`2xl:text-2xl text-lg capitalize ${cursorStyle} ${linkColor}`}
          onClick={isLastLink ? e => e.preventDefault() : undefined}
          href={href}
        >
          {title}
        </Link>

        {!isLastLink && (
          <span className={isRTL ? '' : 'transform rotate-180'}>
            <ArrowBreadCrumbIcon />
          </span>
        )}
      </div>
    );
  });

  return (
    <div
      className='hidden md:flex items-center gap-3'
      data-test={dataTest}
    >
      <Link
        href='#'
        onClick={e => {
          e.preventDefault();
          back(); // TODO-research: Research to use href instead of back
        }}
      >
        <ArrowBackIcon />
      </Link>

      {linksList}
    </div>
  );
};
