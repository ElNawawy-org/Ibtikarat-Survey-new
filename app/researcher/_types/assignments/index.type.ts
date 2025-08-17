type TAssignmentResponse = {
  id: string;
  quantity: number;
  price: number;
  responses: number;
  status: string;
  order: {
    id: string;
    survey: {
      surveyName: string;
      uniqueUrl: string;
    };
  };
};

type TAssignmentsResponse = {
  assignmentsByType: {
    assignments: TAssignmentResponse[];
    pageInfo: {
      totalPages: number;
    };
  };
};

type TAssignment = {
  orderDetails: {
    id: string;
    title: string;
    numberOfRequiredAnswers: number;
    orderPrice: number;

    percentage?: number;
    status?: string;
  };
  assignmentId: string;
  surveyId: string;
  responsesIsComplete: boolean;
  disableOpenSurveyButton: boolean;
};

export type { TAssignmentsResponse, TAssignmentResponse, TAssignment };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
