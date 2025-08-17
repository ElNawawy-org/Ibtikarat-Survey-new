/*
 * This file is here to help us to be able to use this file "components\researcher\orders\order-sidebar.js"
 * //TODO-refactorFile: refactor this file to follow the new component structure and best practice
 */

import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import EditDateIcon from 'public/img/dates/calendar-add.svg';
import StartDateIcon from 'public/img/dates/calendar-edit.svg';
import EndDateIcon from 'public/img/dates/calendar-tick.svg';
import PagesIcon from 'public/img/files-and-text/note-black.svg';
import QuestionIcon from 'public/img/q-and-a/question.svg';
import { getQuestionsLength } from './addon-helper';
import { formatDateInDigits } from '@components/shared/date-condition';
import RenderDetails from '@components/ui/render-details';

const SurveyDetails = ({
  createdDate = '',
  publishedAt = '',
  lastUpdates = '',
  show,
  details = '{}',
  startDate,
  endDate,
}) => {
  const { t, lang } = useTranslation();

  const renderedDetails = [
    {
      type: show.filter(show => show === 'createdDate'),
      icon: <StartDateIcon fill='#292d32' />,
      title: formatDateInDigits(lang, createdDate),
      subTitle: '',
      label: t('common:orders.order.sidebar.createdDate'),
    },
    {
      type: show.filter(show => show === 'publishedAt'),
      icon: <EndDateIcon fill='#292d32' />,
      title: formatDateInDigits(lang, publishedAt),
      subTitle: '',
      label: t('common:orders.order.sidebar.publishDate'),
    },
    {
      type: show.filter(show => show === 'lastUpdates'),
      icon: <EditDateIcon fill='#292d32' />,
      title: formatDateInDigits(lang, lastUpdates),
      subTitle: '',
      label: t('common:orders.order.sidebar.lastUpdated'),
    },
    {
      type: show.filter(show => show === 'details'),
      icon: <PagesIcon fill='#292d3' />,
      title: (details && JSON.parse(details).pages?.length) || 0,
      label: t('common:orders.order.sidebar.pagesNum'),
    },
    {
      type: show.filter(show => show === 'details'),
      icon: <QuestionIcon />,
      title: (details && getQuestionsLength(JSON.parse(details))) || 0,
      label: t('common:orders.order.sidebar.questionsNum'),
    },
    {
      type: show.filter(show => show === 'startDate'),
      icon: <StartDateIcon className='w-7 h-7' />,
      title: formatDateInDigits(lang, startDate),
      label: t('common:supervisor.survey.sidebar.startDate'),
    },
    {
      type: show.filter(show => show === 'endDate'),
      icon: <EndDateIcon className='w-7 h-7' />,
      title: formatDateInDigits(lang, endDate),
      label: t('common:supervisor.survey.sidebar.endDate'),
    },
  ];

  return (
    <div className='flex flex-col gap-7'>
      {renderedDetails.map(item => {
        return (
          <RenderDetails
            item={item}
            key={item.label}
          />
        );
      })}
    </div>
  );
};

export default SurveyDetails;
