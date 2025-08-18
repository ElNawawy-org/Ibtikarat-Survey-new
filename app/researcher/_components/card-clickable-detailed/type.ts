type TProps = {
  orderDetails: {
    id: string;
    title: string;
    numberOfRequiredAnswers: number;
    orderPrice: number;

    percentage?: number;
    status?: string;
  };
  trans: (key: string) => string;
  assignmentId: string;
  surveyId: string;
  responsesIsComplete: boolean;
  disableOpenSurveyButton: boolean;

  lang?: string;
};

export type { TProps };
