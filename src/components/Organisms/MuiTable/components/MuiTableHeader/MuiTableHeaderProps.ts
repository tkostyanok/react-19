import type { MuiTableHeaderCell } from 'src/interfaces';

export interface MuiTableHeaderProps<T extends object> {
  // numSelected: number;
  // onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // order: Order;
  // orderBy: Order;
  // rowCount: number;
  headerCells: readonly MuiTableHeaderCell<T>[];
}