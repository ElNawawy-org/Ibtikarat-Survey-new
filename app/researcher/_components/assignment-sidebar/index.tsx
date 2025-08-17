import { FC } from 'react';
import { TProps } from './type';

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
  return (
    <div>
      {assignmentId +
        assignmentStatus +
        price +
        numberOfRequiredAnswers +
        rejectRequestNotes +
        responsesIsComplete +
        surveyId +
        surveyScaleId +
        surveyJson +
        surveyStatus +
        surveyType +
        surveyUrl +
        startDate +
        endDate}
    </div>
  );
};
