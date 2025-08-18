import {
  TAssignment,
  TAssignmentResponse,
} from 'app/researcher/_types/assignments/[id]/draft-answers.type';

type TMapAssignment = (assignment: TAssignmentResponse) => TAssignment;

const mapAssignment: TMapAssignment = ({ order: { survey } }) => {
  return {
    surveyName: survey.surveyName,
  };
};

export { mapAssignment };
