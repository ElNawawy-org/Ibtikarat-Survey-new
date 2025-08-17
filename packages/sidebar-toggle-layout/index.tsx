import { useState } from 'react';
import { TProps } from './type';
import { DoubleArrowIcon } from 'packages/sidebar-toggle-layout/double-arrow-icon';

export const SidebarToggleLayout = ({
  children,
  toggleSideChildren,
}: TProps) => {
  const [ShowAside, setShowAside] = useState(true);

  return (
    <div className='h-full grid gap-8 md:grid-cols-[1fr_auto]'>
      <section
        data-name='FixedSide'
        className='self-start grid gap-8'
      >
        {children}
      </section>

      <aside
        data-name='ToggleSide'
        className='flex md:max-w-[300px] -mt-8 h-max'
      >
        <button
          className={`hidden md:block self-start bg-secondary-100 border border-[#D2D2D2] p-2 shadow-sm cursor-pointer mt-2 ${
            ShowAside ? 'rotate-180' : ''
          }`}
          onClick={() => setShowAside(prev => !prev)}
          type='button'
        >
          <DoubleArrowIcon />
        </button>

        <div
          className={`bg-grey-300 p-2 flex-1 h-full ${ShowAside ? 'block' : 'hidden'}`}
        >
          {toggleSideChildren}
        </div>
      </aside>
    </div>
  );
};
