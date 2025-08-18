import { E_ASSIGNMENT_STATUSES } from 'app/researcher/_enums/assignments/index.enum';
import {
  TAssignment,
  TAssignmentResponse,
} from 'app/researcher/_types/assignments/index.type';

type TMapAssignments = (assignments: TAssignmentResponse[]) => TAssignment[];

const mapAssignments: TMapAssignments = assignments => {
  const { E_PENDING_FOR_APPROVAL, E_REJECTED } = E_ASSIGNMENT_STATUSES;

  return assignments?.map(
    ({ id, quantity, price, responses, status, order }) => ({
      orderDetails: {
        id: order.id,
        title: order.survey.surveyName,
        numberOfRequiredAnswers: quantity,
        orderPrice: price,
        percentage: parseFloat(((responses / quantity) * 100).toFixed(2)),
        status: status,
      },
      assignmentId: id,
      surveyId: order.survey.uniqueUrl,
      responsesIsComplete: responses >= quantity,
      disableOpenSurveyButton:
        responses >= quantity ||
        status === E_PENDING_FOR_APPROVAL ||
        status === E_REJECTED,
    })
  );
};

export { mapAssignments };
