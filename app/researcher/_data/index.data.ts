import { CloseCircleIcon } from 'app/researcher/_assets/icons/close-circle-icon';
import { ShieldIcon } from 'app/researcher/_assets/icons/shield-icon';
import { ShieldTimeIcon } from 'app/researcher/_assets/icons/shield-time-icon';
import { SurveyIcon } from 'app/researcher/_assets/icons/survey-icon';
import { TCard, TCardsParams } from 'app/researcher/_types/index.type';
import { TTrans } from 'app/researcher/_types/shared.type';
import { TColumn } from 'packages/simple-table/type';

type T_COLUMNS = (trans: TTrans) => TColumn[];
type T_CARDS = (params: TCardsParams) => TCard[];

const COLUMNS: T_COLUMNS = trans => [
  { id: '1', header: trans('common:supervisor.tables.number'), accessor: 'id' },
  {
    id: '2',
    header: trans('common:researcher.assignments'),
    accessor: 'order',
  },
  {
    id: '3',
    header: trans('common:supervisor.tables.progress'),
    accessor: 'progress',
  },
  {
    id: '4',
    header: trans('common:supervisor.tables.options'),
    accessor: 'options',
  },
];

const CARDS: T_CARDS = ({ data, trans }) => [
  {
    id: '1',
    href: 'researcher/assignments?status=PENDING_FOR_APPROVAL',
    value: data?.newOrders,
    label: trans('researcher.newAssignments'),
    icon: SurveyIcon,
  },
  {
    id: '2',
    href: 'researcher/assignments?status=IN_PROGRESS',
    value: data?.inprogress,
    label: trans('researcher.inProgressAssignments'),
    icon: ShieldTimeIcon,
  },
  {
    id: '3',
    href: 'researcher/finished-assignments?status=COMPLETED',
    value: data?.accomplished,
    label: trans('researcher.finishedAssignments'),
    icon: ShieldIcon,
  },
  {
    id: '4',
    href: 'researcher/rejected-assignments?status=PENDING_FOR_RESEARCHER',
    value: data?.rejected,
    label: trans('researcher.rejectedAssignments'),
    icon: CloseCircleIcon,
  },
];

export { COLUMNS, CARDS };
