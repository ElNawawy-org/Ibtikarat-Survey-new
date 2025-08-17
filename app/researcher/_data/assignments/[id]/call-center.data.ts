import { ClosedIcon } from 'pages/researcher/_assets/icons/closed-icon';
import { DotsHorizontalIcon } from 'pages/researcher/_assets/icons/dots-horizontal-icon';
import { EditIcon } from 'pages/researcher/_assets/icons/edit-icon';
import { E_CALL_CENTER_STATUSES } from 'pages/researcher/_enums/assignments/[id]/call-center.enum';
import {
  T_CARDS,
  T_COLUMNS,
} from 'pages/researcher/_types/assignments/[id]/call-center.type';

const {
  E_NO_RESPONSE,
  E_CONTINUE_LATER,
  E_REJECTED,
  E_CALL_LATER,
  E_CLOSED,
  E_NO_CONTINUE,
} = E_CALL_CENTER_STATUSES;

const CARDS: T_CARDS = ({ data, trans }) => [
  {
    id: '1',
    value: data[E_NO_RESPONSE],
    label: trans('ordersQuotes.noResponse'),
    icon: DotsHorizontalIcon,
  },
  {
    id: '2',
    value: data[E_CONTINUE_LATER],
    label: trans('ordersQuotes.continueLater'),
    icon: ClosedIcon,
  },
  {
    id: '3',
    value: data[E_REJECTED],
    label: trans('ordersQuotes.rejected'),
    icon: ClosedIcon,
  },
  {
    id: '4',
    value: data[E_CALL_LATER],
    label: trans('ordersQuotes.delayed'),
    icon: EditIcon,
  },
  {
    id: '5',
    value: data[E_CLOSED],
    label: trans('ordersQuotes.closed'),
    icon: ClosedIcon,
  },
  {
    id: '6',
    value: data[E_NO_CONTINUE],
    label: trans('ordersQuotes.noContinue'),
    icon: ClosedIcon,
  },
];

const COLUMNS: T_COLUMNS = ({ trans }) => [
  { id: '1', header: trans('supervisor.tables.id'), accessor: 'id' },
  {
    id: '2',
    header: trans('supervisor.tables.responseJson'),
    accessor: 'responseJson',
  },
  { id: '3', header: trans('supervisor.tables.status'), accessor: 'status' },
  {
    id: '4',
    header: trans('supervisor.tables.status'),
    accessor: 'callLaterDate',
  },
  { id: '5', header: trans('supervisor.tables.options'), accessor: 'options' },
];

export { CARDS, COLUMNS };

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
