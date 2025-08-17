type TAssignmentResponse = {
  quantity: number;
  order: {
    id: string;
    survey: {
      surveyName: string;
    };
  };
};

type TAssignmentsResponse = {
  myRejectedAssignments: {
    assignments: TAssignmentResponse[];
    pageInfo: {
      totalPages: number;
    };
  };
};

type TAssignment = {
  id: string;
  numberOfRequiredAnswers: number;
  surveyName: string;
};

export type { TAssignmentResponse, TAssignmentsResponse, TAssignment };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
