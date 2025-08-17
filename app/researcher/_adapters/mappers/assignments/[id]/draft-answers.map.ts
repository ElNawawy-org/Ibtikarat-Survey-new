import {
  TAssignment,
  TAssignmentResponse,
} from 'pages/researcher/_types/assignments/[id]/draft-answers.type';

type TMapAssignment = (assignment: TAssignmentResponse) => TAssignment;

const mapAssignment: TMapAssignment = ({ order: { survey } }) => {
  return {
    surveyName: survey.surveyName,
  };
};

export { mapAssignment };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
