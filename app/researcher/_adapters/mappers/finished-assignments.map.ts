import {
  TAssignment,
  TAssignmentResponse,
} from 'app/researcher/_types/finished-assignments.type';

type TMapAssignments = (assignments: TAssignmentResponse[]) => TAssignment[];

const mapAssignments: TMapAssignments = assignments => {
  return assignments?.map(assignment => ({
    id: assignment.order.id,
    numberOfRequiredAnswers: assignment.quantity,
    surveyName: assignment.order.survey.surveyName,
  }));
};

export { mapAssignments };
