import { T_COLUMNS } from 'app/researcher/_types/assignments/[id]/draft-answers.type';

const COLUMNS: T_COLUMNS = ({ trans }) => [
  { id: '1', header: trans('supervisor.tables.id'), accessor: 'id' },
  {
    id: '2',
    header: trans('supervisor.tables.responseJson'),
    accessor: 'responseJson',
  },
  { id: '3', header: trans('supervisor.tables.options'), accessor: 'options' },
];

export { COLUMNS };
