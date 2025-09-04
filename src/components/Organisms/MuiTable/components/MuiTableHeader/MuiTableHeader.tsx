import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import { GREY_300, GREY_600 } from 'src/constants/colors';

import type { MuiTableHeaderProps } from './MuiTableHeaderProps';

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
      <TableRow
        sx={{
          backgroundColor: GREY_300,
          borderBottom: `2px solid ${GREY_600}`,
          borderTop: `2px solid ${GREY_600}`
        }}
      >
        {headerCells.map((headerCell) => (
          <TableCell
            key={headerCell.field}
            align={headerCell?.align || 'inherit'}
            sortDirection={orderBy === headerCell.field ? order : false}
            sx={{
              maxWidth: headerCell?.width ? `${headerCell.width}px` : 'none',
              padding: '16px 10px',
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
