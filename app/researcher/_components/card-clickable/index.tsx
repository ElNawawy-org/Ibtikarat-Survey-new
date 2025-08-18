/**
 * CardClickable component renders a clickable card linking to a given route.
 * It displays an icon, title, and a quantity label using a translation function.
 *
 * @component
 * @example
 * import { CardClickable } from './CardClickable';
 *
 * <CardClickable
 *   href="/orders/123"
 *   title="Finished Orders"
 *   quantity={5}
 *   trans={(key) => t(key)} //typically from next-translate useTranslation().t
 * />
 */

/*
@Explanation:
* We are passing the translation `trans` function as a prop to the component,
* However, we can use the `useTranslation` hook inside the component to get the translation function.
? Why do we use this approach?
* Because we are preparing this component to be reusable without breaks at any module
* We need it to be isolated
*/

import Link from 'next/link';
import { FC } from 'react';
import { ClipboardIcon } from 'app/researcher/_assets/icons/clipboard-icon';
import { DocumentIcon } from 'app/researcher/_assets/icons/document-icon';
import { TProps } from './type';

export const CardClickable: FC<TProps> = ({ href, title, quantity, trans }) => {
  return (
    <Link
      href={href}
      className='grid gap-6 p-4 select-none bg-white border border-grey-400 cursor-pointer hover:shadow-md'
    >
      <span className='flex items-center gap-2'>
        <ClipboardIcon />

        <span>{title}</span>
      </span>

      <span className='flex items-center gap-2'>
        <DocumentIcon />

        <span className='text-dark-200'>
          {trans('researcher.quantity')}&nbsp;:&nbsp;
        </span>

        <span className='font-bold'>
          {quantity}&nbsp;{trans('admin.order.cards.response')}
        </span>
      </span>
    </Link>
  );
};
