import type { GridColDef } from '@mui/x-data-grid';

export const columnsDefault: GridColDef[] = [
  { 
    field: 'nameLabel',
    headerName: 'Name',
    width: 150
  },
  {
    field: 'genderLabel',
    headerName: 'Gender',
    width: 100,
  },
  {
    field: 'citizenshipLabel',
    headerName: 'Citizenship',
    width: 200,
  },
  {
    field: 'skillsLabel',
    headerName: 'Skills',
    width: 200,
  },
  {
    field: 'occupationLabel',
    headerName: 'Occupation',
    width: 150,
  },
  {
    field: 'memberOfLabel',
    headerName: 'Member of',
    width: 150,
  },
  {
    field: 'creatorLabel',
    headerName: 'Creator',
    width: 200,
  },
];