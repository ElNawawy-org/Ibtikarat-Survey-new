import { JSX } from 'react';
import { TTrans } from 'app/researcher/_types/shared.type';

type TOrderStatics = {
  newOrders: string;
  inprogress: string;
  accomplished: string;
  rejected: string;
};

type TAssignmentResponse = {
  quantity: number;
  responses: number;
  order: {
    id: string;
    survey: {
      surveyName: string;
    };
  };
};

type TAssignmentsResponse = {
  researcherDashboard: {
    assignments: TAssignmentResponse[];
    orderStatics: TOrderStatics;
  };
};

type TAssignment = {
  id: string;
  numberOfRequiredAnswers: number;
  numberOfResponses: number;
  surveyName: string;
};

type TDashboard = {
  newOrders: string;
  inprogress: string;
  accomplished: string;
  rejected: string;
};

type TCard = {
  id: string;
  href: string;
  value: string;
  label: string;
  icon: () => JSX.Element;
};

type TCardsParams = {
  data: {
    newOrders: string;
    inprogress: string;
    accomplished: string;
    rejected: string;
  };
  trans: TTrans;
};

export type {
  TAssignmentResponse,
  TAssignmentsResponse,
  TAssignment,
  TDashboard,
  TCard,
  TCardsParams,
};

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
