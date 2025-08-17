import { JSX } from 'react';

/**
 * Represents a column definition for the SimpleTable component.
 * @property id - Unique identifier for the column (should match the order in the columns array)
 * @property header - The display name for the column header
 * @property accessor - The key in the row object to display in this column
 */
type TColumn = {
  id: string;
  header: string;
  accessor: string;
};

/**
 * Represents a row of data for the SimpleTable component.
 * The row must have an id and can have any additional properties.
 */
type TRow = {
  id: string;
  [key: string]: string | JSX.Element;
};

/**
 * Props for the SimpleTable component.
 * @property header - The table title
 * @property columns - Array of column definitions
 * @property rows - Array of row data objects
 */
type TProps = {
  columns: TColumn[];
  rows: TRow[];

  header?: string;
};

export type { TColumn, TRow, TProps };
