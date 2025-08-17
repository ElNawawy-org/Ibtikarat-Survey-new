/*
 * This file is a copy of the old component
 * "components\researcher\orders\order-sidebar.js"
 * //TODO-refactorFile: refactor this file to follow the new component structure and best practice
 */

import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useState } from 'react';
import { TProps } from './type';
import SurveyDetails from './helpers-components/SurveyDetails';
import AcknowledgmentModal from './helpers-components/acknowledgment-modal';
import Button from './helpers-components/button';
import Modal from './helpers-components/modal';
import OrderShareLink from './helpers-components/order-share-link';
import RejectResearcherModal from './helpers-components/reject-modal';
import WithdrawalModal from './helpers-components/withdrawal-modal';
import { Mark } from '@hooks/useGql';
import useMutation from '@hooks/useMutation';

export const AssignmentSidebar: FC<TProps> = ({
  assignmentId,
  assignmentStatus,
  price,
  numberOfRequiredAnswers,
  rejectRequestNotes,
  responsesIsComplete,
  surveyId,
  surveyScaleId,
  surveyJson,
  surveyStatus,
  surveyType,
  surveyUrl,
  startDate,
  endDate,
}) => {
  const { t } = useTranslation('common');
  const { mutate } = useMutation();
  const router = useRouter();
  const [rejectModal, setRejectModal] = useState(false);
  const [isWithdrawalModal, setIsWithdrawalModal] = useState(false);
  const [acknowledgmentModal, setAcknowledgmentModal] = useState(false);

  const deleteAssignment = async (assignmentID: string) => {
    await mutate('quitAssignment', {
      vars: { assignmentID: Mark(assignmentID) },
      //TODO-typescript: fix this error
      //@ts-expect-error ts(2349)
    }).then(router.push('/researcher/assignments'));
  };

  //TODO-typescript: set this function's type
  const deleteAllAssignments = () => {
    return deleteAssignment(assignmentId);
  };

  return (
    <>
      <div className='flex flex-col gap-14 py-4'>
        {assignmentStatus === 'PENDING_FOR_APPROVAL' ? (
          <div>
            <span className='flex justify-between h-14 w-full'>
              {t('researcher.price')}
              {':  ' + price + ' ' + t('researcher.SAR')}
            </span>
            <span className='flex justify-between h-14 w-full'>
              {t('researcher.quantity')}
              {': ' + numberOfRequiredAnswers + ' '}
            </span>

            <div className='flex justify-between gap-2'>
              <Button
                dataTest='any'
                primary
                type='button'
                customClassName={`w-full px-0!`}
                onClick={() => setAcknowledgmentModal(true)}
              >
                {t('researcher.approve')}
              </Button>
              <Button
                dataTest='any'
                grey
                type='button'
                customClassName={`w-full px-0!`}
                onClick={() => setRejectModal(true)}
              >
                {t('researcher.reject')}
              </Button>
            </div>
          </div>
        ) : assignmentStatus === 'IN_PROGRESS' ? (
          <>
            <Button
              dataTest='any'
              customClassName='py-3! px-6!'
              brown
              onClick={() => setIsWithdrawalModal(true)}
            >
              {t('researcher.withdrawal')}
            </Button>

            <OrderShareLink
              surveyUrl={surveyUrl}
              surveyId={surveyId}
              surveyStatus={surveyStatus}
              surveyType={surveyType}
              surveyScaleId={surveyScaleId}
              checked={true}
              showHeader={false}
              assignmentId={assignmentId}
              responsesIsComplete={responsesIsComplete}
              backgroundColor='bg-white'
              urlSource='direct'
            />
          </>
        ) : assignmentStatus === 'REJECTED' ? (
          <Button
            onClick={() => {}}
            dataTest='any'
            customClassName='py-3! px-6!'
            disabled={true}
            //borderBrown
          >
            {t('researcher.waitReassign')}
          </Button>
        ) : (
          assignmentStatus === 'REJECTED_CHANGE_REQUEST' && (
            <div className='flex flex-col gap-2'>
              <div className='text-md font-semibold'>
                {t(
                  'supervisor.assignedOrders.rejectAssignmentReason.supervisorNote'
                )}
                :
              </div>
              <div className='mb-12'>{rejectRequestNotes}</div>
              <div className='flex justify-between gap-2'>
                <Button
                  dataTest='any'
                  primary
                  type='button'
                  customClassName={`w-full px-0!`}
                  onClick={() => {}}
                >
                  {t('researcher.approve')}
                </Button>
                <Button
                  dataTest='any'
                  danger
                  customClassName={`w-full px-0!`}
                  onClick={() => setIsWithdrawalModal(true)}
                >
                  {t('researcher.withdrawal')}
                </Button>
              </div>
            </div>
          )
        )}

        <Modal
          title={t('supervisor.assignedOrders.rejectAssignmentReason.title')}
          titleTextSize={'text-lg'}
          outerHeight={'w-2/5 bg-[#f8f8f8]!'}
          open={rejectModal}
          onClose={() => setRejectModal(false)}
          isForm={true}
        >
          <RejectResearcherModal
            setRejectModal={setRejectModal}
            assignmentId={assignmentId}
            deleteAllAssignments={deleteAllAssignments}
          />
        </Modal>

        <Modal
          title={t('researcher.acknowledgment.title')}
          titleTextSize={'text-lg'}
          outerHeight={'w-2/3 !bg-[#f8f8f8]'}
          open={acknowledgmentModal}
          onClose={() => setAcknowledgmentModal(false)}
          isForm={true}
        >
          <AcknowledgmentModal
            assignmentId={assignmentId}
            setAcknowledgmentModal={setAcknowledgmentModal}
          />
        </Modal>

        <div className='flex flex-col gap-4'>
          <div className='text-base capitalize font-semibold'>
            {t('researcher.surveyData')}
          </div>

          <SurveyDetails
            show={['startDate', 'endDate', 'details']}
            details={surveyJson}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>

      <Modal
        title={t('researcher.withdrawalModal.title')}
        description={t('researcher.withdrawalModal.description')}
        titleTextSize={
          'lg:text-lg text-base max-w-xl text-center px-4 sm:whitespace-pre-wrap!'
        }
        subTitleTextSize=' lg:mb-7 mb-3 text-black! text-center'
        outerHeight='w-1/2! py-8!'
        open={isWithdrawalModal}
        onClose={() => setIsWithdrawalModal(false)}
        isForm={true}
      >
        <WithdrawalModal
          setIsWithdrawalModal={setIsWithdrawalModal}
          deleteAllAssignments={deleteAllAssignments}
        />
      </Modal>
    </>
  );
};

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
