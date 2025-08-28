import type { MuiTableHeaderCell } from 'src/interfaces';

export interface  MuiTableProps<T extends object> {
  headerCells: readonly MuiTableHeaderCell<T>[];
  orderBy?: keyof T;
  onRowClick?: (data: T) => void;
  rowsData: readonly T[];
}
