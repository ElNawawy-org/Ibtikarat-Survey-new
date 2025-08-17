import {
  TAssignment,
  TAssignmentResponse,
} from 'app/researcher/_types/rejected-assignments.type';

type TMapAssignments = (assignments: TAssignmentResponse[]) => TAssignment[];

const mapAssignments: TMapAssignments = assignments => {
  return assignments?.map(assignment => ({
    id: assignment.order.id,
    numberOfRequiredAnswers: assignment.quantity,
    surveyName: assignment.order.survey.surveyName,
  }));
};

export { mapAssignments };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
