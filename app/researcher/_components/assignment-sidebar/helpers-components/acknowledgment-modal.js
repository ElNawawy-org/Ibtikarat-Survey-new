/*
 * This file is here to help us to be able to use this file "components\researcher\orders\order-sidebar.js"
 * //TODO-refactorFile: refactor this file to follow the new component structure and best practice
 */

import { Formik } from 'formik';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import Button from '@components/button';
import { Mark } from '@hooks/useGql';
import useMutation from '@hooks/useMutation';

const AcknowledgmentModal = ({
  assignmentId,
  orderId = '',
  setAcknowledgmentModal,
}) => {
  const { push } = useRouter();
  const { t } = useTranslation();
  const { mutate } = useMutation({ disableNotifications: true });
  const [checked, setChecked] = useState(false);

  function approveAssignment() {
    mutate(
      'approveAssignment',
      {
        vars: {
          assignmentID: Mark(assignmentId),
        },
      },
      ['AssignmentsByType', 'RESEARCHER']
    ).then(push('/researcher/assignments/' + orderId));
  }

  return (
    <Formik
      initialValues={{
        acknowledgment: checked,
      }}
    >
      <div className='flex flex-col gap-4'>
        <ul className='flex flex-col gap-2'>
          {new Array(5).fill(0).map((x, _index) => {
            return (
              <li key={_index}>
                {t(`common:researcher.acknowledgment.desc${_index + 1}`)}
              </li>
            );
          })}
        </ul>
        <div className='flex items-center gap-1 mt-5'>
          <Button
            primary={checked}
            borderPrimary={!checked}
            customClassName={'!px-[1px] !py-[1px] w-5 h-5'}
            onClick={() => setChecked(!checked)}
            dataTest='acknowledgmentCheck'
          >
            {checked ? '✔' : ''}
          </Button>
          {t('common:researcher.acknowledgment.check')}
        </div>
        <div className='flex items-center justify-end gap-6'>
          <Button
            primary
            disabled={!checked}
            onClick={approveAssignment}
            dataTest='acknowledgmentApprove'
          >
            {t('common:researcher.acknowledgment.send')}
          </Button>
          <Button
            grey
            onClick={() => setAcknowledgmentModal(false)}
          >
            {t('common:researcher.acknowledgment.cancel')}
          </Button>
        </div>
      </div>
    </Formik>
  );
};

export default AcknowledgmentModal;
