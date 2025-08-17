/**
 * A customizable card component for displaying information with optional hover effects.
 * @example
 *  Simple card without description or shadow
 * <Card label="Users" value={123} icon={<UserIcon />} />
 *
 * @example
 * Card with description and shadow
 * <Card
 *   label="Revenue"
 *   value="$10K"
 *   icon={<RevenueIcon />}
 *   desc="This is the revenue for the current month."
 *   shadow
 * />
 *
 * @example
 * Card with only label and value
 * <Card label="Tasks Completed" value="45" />
 */

import { FC } from 'react';
import { InfoIcon } from 'pages/researcher/_assets/icons/info-icon';
import { TProps } from './type';

export const CardInfo: FC<TProps> = ({
  label,
  value,
  icon: Icon,
  desc = '',
  shadow = false,
}) => {
  const hasHoverEffect = desc ? 'group hover:bg-primary-600' : '';
  const cardOutline = shadow ? 'shadow-lg' : 'border';

  //TODO-tsx: Clone from this component anther one without the hover effect and the fixed height
  return (
    <div
      //! NOTE: This div has a fixed hight, this is a workaround to stop the card from growing during the hover effect
      className={`h-[111px] p-4 select-none ${cardOutline} ${hasHoverEffect}`}
    >
      <div className='h-full grid gap-2 grid-cols-1fr_auto items-center group-hover:hidden'>
        <div className='h-full grid content-around'>
          <span>{value}</span>

          <p>{label}</p>
        </div>

        {Icon && (
          <span className='p-2 border border-grey-600 flex justify-center items-center'>
            <Icon />
          </span>
        )}
      </div>

      {desc && (
        <div className='hidden h-full min-h-[65px] gap-2 group-hover:grid md:group-hover:grid-cols-auto_1fr'>
          <InfoIcon />

          <p className='text-white mt-1'>{desc}</p>
        </div>
      )}
    </div>
  );
};

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
