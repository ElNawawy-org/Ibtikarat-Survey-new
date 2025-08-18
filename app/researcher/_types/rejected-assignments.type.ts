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
