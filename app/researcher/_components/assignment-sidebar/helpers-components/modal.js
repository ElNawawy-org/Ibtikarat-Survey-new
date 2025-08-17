/*
 * This file is here to help us to be able to use this file "components\researcher\orders\order-sidebar.js"
 * //TODO-refactorFile: refactor this file to follow the new component structure and best practice
 */

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from '@headlessui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import CrossIcon from 'public/img/action-menus/close-circle.svg';
import Button from '@components/button';
import PrimaryYesButton from '@components/shared/primary-buttons/primary-yes-button';
import { buildClass } from '@util/tag';

const Modal = ({
  title,
  description = '',
  image = '',
  children,
  open,
  onClose,
  isForm = false,
  onSubmit = '',
  actions = true,
  modalClasses = '',
  titleTextSize = '2xl:text-2xl text-lg mt-4',
  subTitleTextSize = '2xl:text-lg text-base',
  childrenClasses = '',
  outerHeight = '',
  dataTest = '',
}) => {
  const { t, lang } = useTranslation('common');

  if (!isForm)
    return (
      <Dialog
        open={open}
        onClose={() => {}}
      >
        <div
          style={{ zIndex: 9999 }}
          className='fixed inset-0 flex justify-center items-center py-10 2xl:py-20'
        >
          <DialogPanel
            transition
            className='fixed inset-0 bg-[var(--modal-background)] opacity-[var(--modal-opacity)]'
          />

          <div
            className={buildClass(
              'flex flex-col bg-white px-4 py-4 z-10 2xl:space-y-8 space-y-4 overflow-auto w-1/4',
              modalClasses
            )}
          >
            <div className='flex justify-between items-start p-1 border-b'>
              <div className='flex flex-col items-start'>
                <DialogTitle className='2xl:text-xl capitalize text-lg'>
                  {title}
                </DialogTitle>
                <Description className='text-[#ababab]'>
                  {description}
                </Description>
              </div>

              <button
                onClick={onClose}
                type='button'
                className='focus:outline-hidden'
                data-modal-toggle='defaultModal'
              >
                <CrossIcon className='w-5 h-5' />
              </button>
            </div>

            <div className='lg:px-16 px-7'>{children}</div>

            {actions && (
              <div className='flex justify-end gap-4'>
                <PrimaryYesButton
                  type='submit'
                  customClassName='text-center '
                  onClick={() => {
                    if (onSubmit) {
                      onSubmit();
                    } else {
                      onClose();
                    }
                  }}
                />

                <Button
                  type='button'
                  greylight='true'
                  customClassName='text-center'
                  onClick={() => onClose && onClose()}
                >
                  {t('modal.cancel')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    );

  return (
    <Dialog
      open={open}
      onClose={() => {}}
    >
      <div
        style={{ zIndex: 9999 }}
        className='fixed inset-0 flex justify-center items-center p-10 2xl:p-20'
      >
        <DialogPanel
          transition
          className='fixed inset-0 bg-[var(--modal-background)] opacity-[var(--modal-opacity)]'
        />

        <div
          className={buildClass(
            'bg-[#fff] flex relative flex-col 2xl:p-5 p-2 z-10 overflow-auto sm:min-w-[338px]',
            outerHeight
          )}
          dataTest={dataTest}
        >
          <div
            className={`absolute ${
              lang === 'ar' ? 'left-6 sm:left-2' : 'right-6 sm:right-2'
            } sm:top-2 flex justify-end m-1`}
          >
            <button
              onClick={onClose}
              type='button'
              className='z-10 focus:outline-hidden hover:cursor-pointer'
              data-modal-toggle='defaultModal'
            >
              <CrossIcon className='2xl:w-7 2xl:h-7 w-5 h-5' />
            </button>
          </div>
          <div className='flex flex-col items-center gap-2'>
            {image}
            <DialogTitle
              className={buildClass(
                titleTextSize,
                'capitalize whitespace-pre-wrap sm:whitespace-nowrap text-base 2xl:text-xl font-semibold mt-3'
              )}
            >
              {title}
            </DialogTitle>

            <Description
              className={buildClass(
                'text-[#ababab] text-[14px] 2xl:text-md',
                subTitleTextSize
              )}
            >
              {description}
            </Description>
          </div>

          <div className={buildClass('2xl:px-8 pb-2 px-4', childrenClasses)}>
            {children}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
