import { JSX } from 'react';
import { E_CALL_CENTER_STATUSES } from 'pages/researcher/_enums/assignments/[id]/call-center.enum';
import { TTrans } from 'pages/researcher/_types/shared.type';
import { TColumn } from 'packages/simple-table/type';

const {
  E_NO_RESPONSE,
  E_CONTINUE_LATER,
  E_REJECTED,
  E_CALL_LATER,
  E_CLOSED,
  E_NO_CONTINUE,
} = E_CALL_CENTER_STATUSES;

type TAssignmentResponse = {
  id: string;
  quantity: number;
  responses: number;
  status: string;
  rejectRequestNotes: string[] | null;
  order: {
    id: string;
    survey: {
      surveyName: string;
      uniqueUrl: string;
    };
  };
};

type TAssignment = {
  orderDetails: {
    id: string;
    title: string;
    status: string;
  };
  assignmentId: string;
  surveyId: string;
  rejectRequestNotes: string[] | null;
  responses: number;
  quantity: number;
};

type TPhoneNumberResponse = {
  id: string;
  responseJson: string;
  callLaterDate: string | null;
  status: string;
};

type TDashboardResponse = {
  count: number;
  status: string;
}[];

type TDashboard = {
  [E_NO_RESPONSE]: number;
  [E_CONTINUE_LATER]: number;
  [E_REJECTED]: number;
  [E_CALL_LATER]: number;
  [E_CLOSED]: number;
  [E_NO_CONTINUE]: number;
};

type TCard = {
  id: string;
  value: number | string;
  label: string;
  icon: () => JSX.Element;
};

type TData = TDashboard;

type TCardsParams = {
  data: TData;
  trans: TTrans;
};

type T_CARDS = ({ data, trans }: TCardsParams) => TCard[];

type T_COLUMNS = ({ trans }: { trans: TTrans }) => TColumn[];

export type {
  TAssignmentResponse,
  TAssignment,
  TPhoneNumberResponse,
  TDashboard,
  TDashboardResponse,
  T_CARDS,
  T_COLUMNS,
};

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
