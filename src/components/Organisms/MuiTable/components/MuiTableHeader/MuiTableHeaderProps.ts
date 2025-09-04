import type { MouseEvent } from 'react';

import type { MuiTableHeaderCell, Order } from 'src/interfaces';

export interface MuiTableHeaderProps<T extends object> {
  headerCells: readonly MuiTableHeaderCell<T>[];
  onRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void;
  order: Order;
  orderBy?: keyof T;
}