import type {
  IMarvelHeroTableData,
  MuiTableHeaderCell
} from 'src/interfaces';

export const headerCells: MuiTableHeaderCell<IMarvelHeroTableData>[] = [
  { 
    field: 'nameLabel',
    headerName: 'Name',
    width: 130,
  },
  {
    field: 'genderLabel',
    headerName: 'Gender',
    width: 90,
  },
  {
    field: 'citizenshipLabel',
    headerName: 'Citizenship',
    width: 180,
  },  
  {
    field: 'skillsLabel',
    headerName: 'Skills',
    width: 170,
  },
  {
    field: 'occupationLabel',
    headerName: 'Occupation',
    width: 120,
  },
  {
    field: 'memberOfLabel',
    headerName: 'Member of',
    width: 150,
  },
  {
    field: 'creatorLabel',
    headerName: 'Creator',
    width: 140,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 50,
  }
];