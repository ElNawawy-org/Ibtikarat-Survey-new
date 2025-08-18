/**
 * CardClickableDetailed is a reusable component for rendering detailed clickable cards,
 * specifically designed for assignment order previews in the researcher dashboard.
 * It conditionally displays status icons and includes action buttons to open the survey or view details.
 *
 * @component
 * @example
 * import { CardClickableDetailed } from './CardClickableDetailed';
 *
 * const order = {
 *   id: '123',
 *   title: 'Customer Satisfaction Survey',
 *   numberOfRequiredAnswers: 100,
 *   orderPrice: 250,
 *   percentage: 75,
 *   status: 'E_PENDING_FOR_APPROVAL'
 * };
 *
 * <CardClickableDetailed
 *   orderDetails={order}
 *   trans={(key) => key} //Your translation function
 *   assignmentId="abc-456"
 *   surveyId="xyz-789"
 *   responsesIsComplete={false}
 *   disableOpenSurveyButton={false}
 *   lang="ar"
 * />
 */

import Link from 'next/link';
import { FC } from 'react';
import { AwardIcon } from 'app/researcher/_assets/icons/award-icon';
import { ClipboardIcon } from 'app/researcher/_assets/icons/clipboard-icon';
import { DocumentIcon } from 'app/researcher/_assets/icons/document-icon';
import { MoneyIcon } from 'app/researcher/_assets/icons/money-icon';
import { RejectedIcon } from 'app/researcher/_assets/icons/rejected-icon';
import { TimerIcon } from 'app/researcher/_assets/icons/timer-icon';
import { E_ASSIGNMENT_STATUSES } from 'app/researcher/_enums/assignments/index.enum';
import { TProps } from './type';
import { ProgressBar } from 'packages/progress-bar';

const orderDetailsInit = {
  id: '',
  title: 'Title of the Order',
  numberOfRequiredAnswers: 0,
  orderPrice: 0,
  percentage: 0,
  status: '',
};

export const CardClickableDetailed: FC<TProps> = ({
  orderDetails = orderDetailsInit,
  trans,
  assignmentId,
  surveyId,
  responsesIsComplete,
  disableOpenSurveyButton,

  lang = 'ar',
}) => {
  const { id, title, numberOfRequiredAnswers, orderPrice, percentage, status } =
    orderDetails;
  const { E_PENDING_FOR_APPROVAL, E_REJECTED_CHANGE_REQUEST, E_REJECTED } =
    E_ASSIGNMENT_STATUSES;

  const showTimerIcon =
    status === E_PENDING_FOR_APPROVAL || status === E_REJECTED_CHANGE_REQUEST;
  const showCloseIcon = status === E_REJECTED;

  return (
    <Link
      href={`/researcher/assignments/${id}/general-info`}
      className='grid gap-6 p-4 bg-white border border-grey-400 hover:shadow-md relative'
    >
      {showTimerIcon && (
        <span
          className={`bg-secondary-600 rounded-sm p-1 absolute top-[-5px] ${
            lang === 'ar' ? 'left-[-5px]' : 'right-[-5px]'
          }`}
        >
          <TimerIcon />
        </span>
      )}

      {showCloseIcon && (
        <span
          className={`bg-red-200 rounded-full p-1 absolute top-[-5px] ${
            lang === 'ar' ? 'left-[-5px]' : 'right-[-5px]'
          }`}
        >
          <RejectedIcon />
        </span>
      )}

      <span className='flex flex-col gap-6'>
        {/* Start First Row */}
        <span className='flex items-center gap-2'>
          <ClipboardIcon />

          <span>{title}</span>
        </span>
        {/* End First Row */}

        {/* Start Second Row */}
        <span className='flex items-center gap-2'>
          <DocumentIcon />

          <span className='text-dark-200'>
            {trans('researcher.quantity')}&nbsp;:&nbsp;
          </span>

          <span className='font-bold'>
            {numberOfRequiredAnswers}&nbsp;
            {trans('admin.order.cards.response')}
          </span>
        </span>
        {/* End Second Row */}

        {/* Start Third Row */}
        <span className='flex items-center gap-2'>
          <MoneyIcon />

          <span className='text-dark-200'>
            {trans('researcher.surveyPrice')}&nbsp;:&nbsp;
          </span>

          <span className='font-bold'>
            {orderPrice}&nbsp;
            {trans('researcher.SAR')}
          </span>
        </span>
        {/* End Third Row */}

        {/* Start Fourth Row */}
        <span className='flex items-center gap-2'>
          <AwardIcon />

          <span className='text-dark-200'>
            {trans('supervisor.assignedOrders.progress')}
          </span>
        </span>
        {/* End Fourth Row */}

        <ProgressBar percentage={percentage} />

        <span className='grid grid-cols-2 gap-3'>
          <Link
            href={
              disableOpenSurveyButton
                ? ''
                : `${origin}/${lang}/researcher/direct/protect/${surveyId}/${assignmentId}?responsesIsComplete=${responsesIsComplete}`
            }
            className={`bg-grey-600 px-4 py-2 text-center hover:bg-grey-500 
                ${
                  disableOpenSurveyButton ? 'opacity-60 cursor-not-allowed' : ''
                }`}
          >
            {trans('researcher.openSurvey')}
          </Link>

          <Link
            href={`/researcher/assignments/${id}/general-info`}
            className='bg-primary-600 text-white px-4 py-2 text-center hover:bg-primary-500'
          >
            {trans('researcher.viewDetails')}
          </Link>
        </span>
      </span>
    </Link>
  );
};
