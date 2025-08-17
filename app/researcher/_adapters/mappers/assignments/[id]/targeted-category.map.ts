import {
  TAssignment,
  TAssignmentResponse,
  TTargetAudience,
} from 'app/researcher/_types/assignments/[id]/targeted-category.type';

type TMapAssignment = (assignment: TAssignmentResponse) => TAssignment;
type TMapTargetAudience = (data: number) => TTargetAudience;

const mapAssignment: TMapAssignment = ({
  price,
  quantity,
  order: { survey },
}) => {
  return {
    price,
    numberOfRequiredAnswers: quantity,
    surveyName: survey.surveyName,
  };
};

const mapTargetAudience: TMapTargetAudience = data => {
  return [
    {
      name: 'عدد الاستجابات',
      details: [data],
    },
  ];
};

export { mapAssignment, mapTargetAudience };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
