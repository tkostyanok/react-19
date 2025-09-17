import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { GREY_300, GREY_600 } from 'src/constants/colors';

import type { MuiTableHeaderProps } from './MuiTableHeaderProps';
import Box from '@mui/material/Box';

export const  MuiTableHeader = <T extends object>({
  headerCells,
  onFilterClick,
  onFilterDelete,
  onRequestSort,
  order,
  orderBy,
}: MuiTableHeaderProps<T>) => {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const hasFilters = headerCells.some((cell) => cell?.filters && [ ...cell?.filters ]?.length > 0);

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
            />
            {
              headerCell?.filters && [ ...headerCell?.filters ]?.length > 0
                ? (
                  <Badge
                    badgeContent={[ ...headerCell?.filters ]?.length} 
                    color='primary'
                    onClick={() => onFilterClick?.(prevState => !prevState)}
                  >
                    <FilterAltIcon
                      fontSize='small'
                      sx={{ color: GREY_600 }}
                    />
                  </Badge>
                )
                : null 
            }
          </TableCell>
        ))}
      </TableRow>
      { hasFilters 
        ? (
          <TableRow>
            {headerCells.map((headerCell) => (
              <TableCell
                key={`${headerCell.field}-filters`}
                align={headerCell?.align || 'inherit'}
                sx={{
                  maxWidth: headerCell?.width ? `${headerCell.width}px` : 'none',
                  padding: '6px 10px',
                  width: headerCell?.width ? `${headerCell.width}px` : 'auto'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    height: '40px',
                    overflowY: 'auto',
                  }}
                >
                  {
                    headerCell?.filters && [ ...headerCell?.filters ]?.length > 0
                      ? (
                        [ ...headerCell?.filters ].map((filter) => (
                          <Chip
                            key={`${headerCell.field}-filter-${filter}`}
                            label={filter}
                            size='small'
                            variant='outlined'
                            onDelete={onFilterDelete 
                              ? () => onFilterDelete(headerCell.field as keyof T, filter) 
                              : undefined
                            }
                          />
                        ))
                      )
                      : null 
                  }
                </Box>
              </TableCell>
            ))}
          </TableRow>
        ) 
        : null}
    </TableHead>
  );
};
