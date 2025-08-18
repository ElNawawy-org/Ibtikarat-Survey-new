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
