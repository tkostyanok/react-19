import type { GridColDef } from '@mui/x-data-grid';

export const columnsDefault: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 100,
  },
  {
    field: 'citizenship',
    headerName: 'Citizenship',
    width: 200,
  },
  {
    field: 'skills',
    headerName: 'Skills',
    width: 200,
  },
  {
    field: 'occupation',
    headerName: 'Occupation',
    width: 150,
  },
  {
    field: 'memberOf',
    headerName: 'Member of',
    width: 150,
  },
  {
    field: 'creator',
    headerName: 'Creator',
    width: 200,
  },
];
