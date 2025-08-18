import {
  TAssignment,
  TAssignmentResponse,
} from 'app/researcher/_types/index.type';

type TMapAssignments = (assignments: TAssignmentResponse[]) => TAssignment[];

const mapAssignments: TMapAssignments = assignments => {
  return assignments?.map(assignment => ({
    id: assignment.order.id,
    numberOfRequiredAnswers: assignment.quantity,
    numberOfResponses: assignment.responses,
    surveyName: assignment.order.survey.surveyName,
  }));
};

export { mapAssignments };
