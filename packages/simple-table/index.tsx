/**
 * SimpleTable is a component that renders a table structure with customizable headers, columns, and rows.
 * It dynamically generates table header and body based on the provided data.
 *
 * @example
 * const columns = [
 *   { id: 1, header: 'ID', accessor: 'id' },
 *   { id: 2, header: 'Name', accessor: 'name' },
 *   { id: 3, header: 'Age', accessor: 'age' },
 * ];
 *
 * const rows = [
 *   { id: 1, name: 'John', age: 30 },
 *   { id: 2, name: 'Jane', age: 25 },
 * ];
 *
 * <SimpleTable header="User Data" columns={columns} rows={rows} />
 */

import { TProps } from './type';

export const SimpleTable = ({ header, columns, rows }: TProps) => {
  const columnsList = columns.map(({ id, header }) => {
    const firstColumnStyle = +id === 1 ? 'border-r' : '';
    const lastColumnStyle = +id === columns.length ? 'border-l' : '';

    return (
      <th
        key={id}
        className={`min-w-[150px] p-2 border-b border-t ${firstColumnStyle} ${lastColumnStyle}`}
      >
        {header}
      </th>
    );
  });

  const rowsList = rows?.map(row => {
    const rowValues = columns.map(({ id, accessor }) => {
      const firstColumnStyle = +id === 1 ? 'border-r' : '';
      const lastColumnStyle = +id === columns.length ? 'border-l' : '';

      return (
        <td
          key={id}
          className={`p-2 group-hover:border-primary-600 border-b border-t ${firstColumnStyle} ${lastColumnStyle}`}
        >
          {row[accessor]}
        </td>
      );
    });

    return (
      <tr
        key={row.id}
        className='group'
      >
        {rowValues}
      </tr>
    );
  });

  return (
    <div className={`p-1 md:p-5 border overflow-auto`}>
      <h1>{header}</h1>

      <table className='w-full text-center border-separate border-spacing-0-2 text-sm'>
        <thead>
          <tr>{columnsList}</tr>
        </thead>

        <tbody>{rowsList}</tbody>
      </table>
    </div>
  );
};
