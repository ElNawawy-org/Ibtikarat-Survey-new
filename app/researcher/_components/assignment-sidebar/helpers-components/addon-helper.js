/*
 * This file is here to help us to be able to use this file "components\researcher\orders\order-sidebar.js"
 * //TODO-refactorFile: refactor this file to follow the new component structure and best practice
 */

import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import CrossIcon from 'public/img/action-menus/close-circle.svg';
import { revertDashChar } from '@components/create-survey/survey-response-helper';
import connectText from '@hooks/connectText';
import { buildClass } from '@util/tag';

const connect = connectText('common:createSurvey.addons');

const SelectedCategoryOption = ({
  value,
  title,
  onClick,
  deleted,
  addonId,
  originalValue,
}) => {
  const { t } = useTranslation();
  const displayValue = _value => {
    if (typeof _value === 'string') {
      return _value;
    } else if (typeof _value === 'object') {
      return _value.join(', ');
    }
  };

  const handelOrdinalValue = _addonId => {
    switch (_addonId) {
      case 'age':
        return (
          <div>
            {t('common:common.from')} {revertDashChar(originalValue)[0]}
            {t('common:common.to')} {revertDashChar(originalValue)[1]}{' '}
            {t(connect('invoice.year'))}
          </div>
        );
      case 'male':
      case 'female':
      case 'gender':
        return (
          <div>
            {t(connect('invoice.malePercentage'), {
              malePercentage: 100 - originalValue,
            })}{' '}
            -{' '}
            {t(connect('invoice.femalePercentage'), {
              femalePercentage: originalValue,
            })}
          </div>
        );
      case 'inCome':
        return (
          <div>
            {t('common:common.from')} {revertDashChar(originalValue)[0]}{' '}
            {t('common:common.to')} {revertDashChar(originalValue)[1]}{' '}
            {t('common:common.sar')}
          </div>
        );
      default:
        return displayValue(value);
    }
  };

  return (
    <div className={'space-y-4'}>
      <div className='flex justify-between items-center'>
        <p
          onClick={onClick}
          className='text-md cursor-pointer text-dark-100'
        >
          {title}
        </p>
        <p
          onClick={deleted}
          className='flex items-center content-center justify-center cursor-pointer '
        >
          <CrossIcon className='transform scale-[0.8]' />
        </p>
      </div>
      <div
        onClick={onClick}
        className='cursor-pointer max-w-[250px]'
      >
        {handelOrdinalValue(addonId)}
      </div>
    </div>
  );
};

const CategoryOption = ({ added, title, onClick, id }) => {
  const buttonClassName = added ? 'border-primary-600' : 'border-white';
  const iconClassName = added ? 'bg-primary-600' : 'bg-light-400';

  return (
    <button
      id={id}
      type='button'
      className={buildClass(
        'flex justify-between items-center lg:gap-4 gap-3 border lg:p-3 p-2 bg-white shadow-sm focus:outline-hidden cursor-pointer',
        buttonClassName
      )}
      onClick={onClick}
    >
      <p className='text-dark-400 capitalize text-md '>{title}</p>
      <div
        className={buildClass(
          'text-white lg:w-[30px] lg:h-[30px] w-[25px] h-[25px] flex items-center justify-center',
          iconClassName
        )}
      >
        ✔
      </div>
    </button>
  );
};

function countQuestions(elements) {
  const nums = elements?.map(element => {
    let counter = 0;
    if (element.type === 'panel' && element.elements) {
      counter = countQuestions(element.elements);
    } else if (element?.type === 'matrix') {
      counter = element?.rows?.length ?? 0;
    } else {
      counter = 1;
    }
    return counter;
  });

  return nums?.reduce((prev, current) => prev + current, 0);
}

const getQuestionsLength = questions => {
  const elements = questions?.pages
    ?.map(element => {
      return element?.elements;
    })
    .flat();

  const nums = elements?.map(question => {
    let counter = 0;
    if (question?.type === 'panel' && question?.elements) {
      counter = countQuestions(question.elements);
    } else if (question?.type === 'matrix') {
      counter = question?.rows?.length ?? 0;
    } else {
      counter = 1;
    }
    return counter;
  });

  return nums?.reduce((prev, current) => prev + current, 0);
};

const getQuestionsWithChoices = survey => {
  const questionsChoices = [];
  const elements = survey?.pages
    ?.map(element => {
      return element?.elements;
    })
    .flat();

  extractNameForQuestionsWithChoices({
    elements,
    questionsChoices,
  });

  return questionsChoices;
};

const getAllQuestions = survey => {
  const questions = [];
  const elements = survey?.pages
    ?.map(element => {
      return element?.elements;
    })
    .flat();

  extractNameOfQuestions({
    elements,
    questions,
  });

  return questions;
};

const getAllQuestionsObj = survey => {
  const questions = [];
  const elements = survey?.pages
    ?.map(element => {
      return element?.elements;
    })
    .flat();

  for (let index = 0; index < elements?.length; index++) {
    const element = elements?.[index];

    if (element?.type === 'panel') {
      return getAllQuestionsObj({
        elements: element?.elements,
      });
    } else {
      questions.push({
        title: element?.title?.ar ?? element?.title ?? element?.name,
        name: element?.name,
      });
    }
  }

  return questions;
};

const getAllQuestionsDataObj = survey => {
  const questions = [];
  const elements = survey?.pages
    ? survey?.pages
        ?.map(element => {
          return element?.elements;
        })
        .flat()
    : survey?.elements
        ?.map(element => {
          return element?.elements;
        })
        .flat();

  for (let index = 0; index < elements?.length; index++) {
    const element = elements?.[index];

    if (element?.type === 'panel') {
      return getAllQuestionsObj({
        elements: element?.elements,
      });
    } else {
      questions.push({
        title: element?.title?.ar ?? element?.title ?? element?.name,
        name: element?.name,
        ...element,
      });
    }
  }

  return questions;
};

const getQuestionFromTitle = (questionTitle, questions) => {
  return questions.find(({ title }) => title.includes(questionTitle));
};

const getQuestionFromName = (questionName, questions) => {
  return questions.find(question =>
    question?.name.includes(questionName) ? question : null
  );
};

const getHighestIndex = questions => {
  const result = {};
  const pages = questions?.pages;
  let highestIndex = 0;
  pages?.forEach(question =>
    question.elements?.forEach(({ name }) => {
      const type = name.split(/\d+/)?.[0];
      result[type] = parseInt(name.split(type)?.pop());
      if (result[type] > highestIndex) {
        highestIndex = result[type];
      }
    })
  );
  return highestIndex;
};

const extractNameForQuestionsWithChoices = ({ elements, questionsChoices }) => {
  for (let index = 0; index < elements?.length; index++) {
    const element = elements?.[index];

    switch (element?.type) {
      case 'checkbox':
      case 'ranking':
      case 'radiogroup':
      case 'dropdown':
        questionsChoices.push({
          question: element?.title?.ar ?? element?.title ?? element?.name,
          choices: element?.choices,
        });
        break;
      case 'panel':
        extractNameForQuestionsWithChoices({
          questionsChoices,
          elements: element?.elements,
        });
        break;
    }
  }
};

const extractNameOfQuestions = ({ elements, questions }) => {
  for (let index = 0; index < elements?.length; index++) {
    const element = elements?.[index];

    switch (element?.type) {
      case 'panel':
        extractNameOfQuestions({
          questions,
          elements: element?.elements,
        });
        break;
      default:
        questions.push(element?.title?.ar ?? element?.title ?? element?.name);
        break;
    }
  }
};

export {
  SelectedCategoryOption,
  CategoryOption,
  getQuestionsLength,
  getQuestionsWithChoices,
  getAllQuestions,
  getAllQuestionsObj,
  getAllQuestionsDataObj,
  getQuestionFromTitle,
  getQuestionFromName,
  getHighestIndex,
  extractNameForQuestionsWithChoices,
  extractNameOfQuestions,
};

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
