import { JSX } from 'react';
import { TTrans } from 'app/researcher/_types/shared.type';
import { TColumn } from 'packages/simple-table/type';

type TAssignmentResponse = {
  price: number;
  quantity: number;
  order: {
    survey: {
      surveyName: string;
    };
  };
};

type TAssignment = {
  price: number;
  numberOfRequiredAnswers: number;
  surveyName: string;
};

type TTargetAudience = {
  name: string;
  details: number[];
}[];

type TCard = {
  id: string;
  value: number | string;
  label: string;
  icon: () => JSX.Element;
};

type TData = TAssignment;

type TCardsParams = {
  data: TData;
  trans: TTrans;
};

type T_CARDS = ({ data, trans }: TCardsParams) => TCard[];

type T_COLUMNS = ({ trans }: { trans: TTrans }) => TColumn[];

export type {
  TAssignmentResponse,
  TAssignment,
  TTargetAudience,
  T_CARDS,
  T_COLUMNS,
};
