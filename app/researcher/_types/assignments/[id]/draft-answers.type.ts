import { TTrans } from 'app/researcher/_types/shared.type';
import { TColumn } from 'packages/simple-table/type';

type TAssignmentResponse = {
  order: {
    survey: {
      surveyName: string;
    };
  };
};

type TAssignment = {
  surveyName: string;
};

type TDraftAnswerResponse = {
  id: string;
  responseJson: string;
};

type TDraftAnswer = {
  id: string;
  responseJson: string;
};

type T_COLUMNS = ({ trans }: { trans: TTrans }) => TColumn[];

export type {
  TAssignmentResponse,
  TAssignment,
  TDraftAnswerResponse,
  TDraftAnswer,
  T_COLUMNS,
};

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
