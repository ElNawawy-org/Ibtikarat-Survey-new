import { DollarSquareIcon } from 'pages/researcher/_assets/icons/dollar-square-icon';
import { SurveyIcon } from 'pages/researcher/_assets/icons/survey-icon';
import {
  T_CARDS,
  T_COLUMNS,
} from 'pages/researcher/_types/assignments/[id]/targeted-category.type';

const CARDS: T_CARDS = ({ data, trans }) => [
  {
    id: '1',
    value: data.numberOfRequiredAnswers,
    label: trans('admin.allOrders.requiredResponses'),
    icon: SurveyIcon,
  },
  {
    id: '2',
    value: data.price + ' ' + trans('admin.allOrders.SAR'),
    label: trans('admin.allOrders.surveyCostPerRes'),
    icon: DollarSquareIcon,
  },
];

const COLUMNS: T_COLUMNS = ({ trans }) => [
  { id: '1', header: trans('supervisor.tables.name'), accessor: 'name' },
  { id: '2', header: trans('supervisor.tables.details'), accessor: 'details' },
];

export { CARDS, COLUMNS };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
