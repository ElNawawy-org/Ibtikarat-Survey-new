type TProps = {
  assignmentId: string;
  assignmentStatus: string;
  price: number;
  numberOfRequiredAnswers: number;
  rejectRequestNotes: string[] | null;
  responsesIsComplete: boolean;
  surveyId: string;
  surveyScaleId: string | undefined;
  surveyJson: string;
  surveyStatus: string;
  surveyType: string;
  surveyUrl: string;
  startDate: string;
  endDate: string;
};

export type { TProps };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
