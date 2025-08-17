import { T_COLUMNS } from 'pages/researcher/_types/assignments/[id]/draft-answers.type';

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

//TODO-After Migration to app router- remove the following
export default function xyz() {}
/*
Why?
because in the page router (the current router) it is required to have a default export
*/
