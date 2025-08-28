import type { TableCellProps } from '@mui/material/TableCell';

type TGender = 'male' | 'female';

export interface IMarvelHeroesData {
  nameLabel: string | null,
  genderLabel: TGender | null,
  citizenshipLabel: string | null,
  skillsLabel: string | null,
  occupationLabel: string | null,
  memberOfLabel: string | null,
  creatorLabel: string | null
}

export interface ISubTask {
  id: number;
  title: string;
  isCompleted: boolean;
  note?: string;
}

export interface ITestTask1 {
  id: number;
  isCompleted: boolean;
  linkToMUI?: string;
  subTasks: ISubTask[];
  task: string;
}

export interface MuiTableHeaderCell<T extends object> {
  /**
   * Align cell content.
   * Possible values: 'center' | 'left' | 'right' | 'justify' | 'inherit'
   */
  align?: Pick<TableCellProps, 'align'>['align'];
  /**
   * The unique identifier of the column.
   */
  field: Extract<keyof T, string>;
  /**
   * The title displayed in the column header cell.
   */
  headerName: string;
  /**
   * The width of the column in pixels.
   */
  width?: number;
}

export type Order = 'asc' | 'desc';