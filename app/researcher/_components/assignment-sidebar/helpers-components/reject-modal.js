/*
 * This file is here to help us to be able to use this file "components\researcher\orders\order-sidebar.js"
 * //TODO-refactorFile: refactor this file to follow the new component structure and best practice
 */

import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import Button from '@components/button';
import { Option, Select } from '@components/select';
import PrimaryButton from '@components/shared/primary-buttons/primary-button';
import Textarea from '@components/textarea';
import connectText from '@hooks/connectText';
import { Mark } from '@hooks/useGql';
import useMutation from '@hooks/useMutation';

const RejectModal = ({
  assignmentId,
  setRejectModal,
  deleteAllAssignments,
}) => {
  const { t } = useTranslation();
  const { mutate } = useMutation();
  const connect = connectText(
    'common:supervisor.assignedOrders.rejectAssignmentReason'
  );

  function onSubmit(values) {
    if (values.rejectAssignmentReason === 'NOT_AVAILABLE') {
      deleteAllAssignments();
    } else {
      mutate(
        'rejectAssignment',
        {
          vars: {
            assignmentID: Mark(assignmentId),
            rejectAssignmentReason: Mark(values.rejectAssignmentReason),
            rejectionNotes: values.rejectionNotes,
          },
        },
        ['assignmentOrder']
      ).then(() => {
        setRejectModal(false);
      });
    }
  }
  const fieldClass = `!text-dark-400 font-bold h-7 !p-0 !bg-white outline-hidden 
    border-none focus:outline-hidden focus:border-none focus:ring-0`;
  const fieldStyle =
    'w-full border-none focus:outline-hidden focus:border-none focus:ring-0';
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        rejectAssignmentReason: '',
        rejectionNotes: '',
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className='flex flex-col gap-5 mt-5'>
          <div className='md:gap-5 gap-2 items-center w-full'>
            <Select
              form={true}
              name='status'
              label={t(connect('rejectAssignmentReason'))}
              onChange={value => {
                setFieldValue('rejectAssignmentReason', value);
              }}
              labelStyle={'text-dark-100 text-md!'}
              className={fieldStyle}
              containerStyle={{
                boxShadow: 'none',
                padding: '12px 16px',
              }}
            >
              <Option
                value='PRICE'
                className={'capitalize'}
              >
                {t('enums:reject.PRICE')}
              </Option>

              <Option
                value='QUANTITY'
                className={'capitalize'}
              >
                {t('enums:reject.QUANTITY')}
              </Option>
              <Option
                value='NOT_AVAILABLE'
                className={'capitalize'}
              >
                {t('enums:reject.NOT_AVAILABLE')}
              </Option>
            </Select>
          </div>
          <Textarea
            label={t(connect('rejectionNotes'))}
            name='rejectionNotes'
            customClass={`${fieldClass} w-full p-3! h-full! bg-white!`}
            parentCss={'h-full!'}
            inputHolderStyle={'h-[200px]'}
          />

          <div className='flex md:flex-row flex-col gap-2 justify-between items-center mt-3'>
            <Button
              grey
              customClassName='px-16!'
              onClick={() => onSubmit(values)}
            >
              {t('common:researcher.reject')}
            </Button>
            <PrimaryButton
              type='button'
              customClassName='px-16!'
              onClick={() => setRejectModal(false)}
            >
              {t('common:FAQ.sendMsgModal.cancel')}
            </PrimaryButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RejectModal;
