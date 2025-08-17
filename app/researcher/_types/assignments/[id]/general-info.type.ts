import { TTrans } from 'app/researcher/_types/shared.type';

type TLayoutAssignmentResponse = {
  id: string;
  status: string;
  price: number;
  quantity: number;
  responses: number;
  rejectRequestNotes: string[] | null;
  order: {
    survey: {
      id: string;
      uniqueUrl: string;
      surveyJson: string;
      status: string;
      surveyType: string;
      surveyScale: {
        id: string;
      } | null;
      collect: {
        startDate: string;
        endDate: string;
      };
    };
  };
};

type TLayoutAssignment = {
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

type TAssignmentResponse = {
  price: number;
  quantity: number;
  status: string;
  order: {
    survey: {
      surveyName: string;
    };
  };
};

type TAssignment = {
  surveyName: string;
  progressPercentage: number;
  profit: string;
  responses: number;
  rejectedResponses: number;
  responsesByDay: {
    name: string;
    numberOfAnswers: number;
  }[];
  responsesByHour: {
    name: string;
    numberOfAnswers: number;
  }[];
};

type dayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

type TResearcherPerformanceResponse = {
  responses: number;
  rejectedResponses: number;
  responseByDay: {
    dayOfWeek: dayOfWeek;
    responseCount: string;
  }[];
  responseByHour: {
    hourOfDay: string;
    responseCount: string;
  }[];
};

type TCard = {
  id: string;
  value: number | string;
  label: string;
  description?: string;
};

type TData = TAssignment;

type TCardsParams = {
  data: TData;
  trans: TTrans;
};

type T_CARDS = ({ data, trans }: TCardsParams) => TCard[];

export type {
  TLayoutAssignmentResponse,
  TLayoutAssignment,
  TAssignmentResponse,
  TAssignment,
  TResearcherPerformanceResponse,
  T_CARDS,
};

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
