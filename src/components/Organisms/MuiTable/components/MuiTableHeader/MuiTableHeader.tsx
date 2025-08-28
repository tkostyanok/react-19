import type { MouseEvent } from 'react';

import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import type { MuiTableHeaderCell, Order } from 'src/interfaces';

interface MuiTableHeaderProps<T extends object> {
  headerCells: readonly MuiTableHeaderCell<T>[];
  onRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void;
  order: Order;
  orderBy?: keyof T;
}

export const  MuiTableHeader = <T extends object>({
  headerCells,
  onRequestSort,
  order,
  orderBy,
}: MuiTableHeaderProps<T>) => {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headerCell) => (
          <TableCell
            key={headerCell.field}
            align={headerCell?.align || 'inherit'}
            sortDirection={orderBy === headerCell.field ? order : false}
            sx={{
              maxWidth: headerCell?.width ? `${headerCell.width}px` : 'none',
              width: headerCell?.width ? `${headerCell.width}px` : 'auto'
            }}
          >
            {headerCell.headerName}
            <TableSortLabel
              active={orderBy === headerCell.field}
              direction={orderBy === headerCell.field ? order : 'asc'}
              onClick={createSortHandler(headerCell.field)}
            >
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
