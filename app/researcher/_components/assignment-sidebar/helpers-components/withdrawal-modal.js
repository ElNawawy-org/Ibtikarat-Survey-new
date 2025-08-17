/*
 * This file is here to help us to be able to use this file "components\researcher\orders\order-sidebar.js"
 * //TODO-refactorFile: refactor this file to follow the new component structure and best practice
 */

import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import Button from '@components/button';
import PrimaryYesButton from '@components/shared/primary-buttons/primary-yes-button';

const WithdrawalModal = ({ setIsWithdrawalModal, deleteAllAssignments }) => {
  const { t } = useTranslation();

  return (
    <div className='flex md:flex-row flex-col gap-3 items-center justify-between'>
      <PrimaryYesButton
        customClassName='md:w-1/2 w-2/3'
        onClick={deleteAllAssignments}
      />

      <Button
        grey
        customClassName='md:w-1/2 w-2/3'
        onClick={() => setIsWithdrawalModal(false)}
      >
        {t('common:researcher.withdrawalModal.no')}
      </Button>
    </div>
  );
};

export default WithdrawalModal;
