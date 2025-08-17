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

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
