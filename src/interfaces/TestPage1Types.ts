import type { TableCellProps } from '@mui/material/TableCell';

import type { Gender } from './CommonTypes';

export type MarvelHeroFilterValues = {
  [K in keyof IMarvelHeroesData]: Set<string> | string[] | [];
};

export interface IMarvelHeroesData {
  nameLabel: string | null;
  citizenshipLabel: string | null;
  creatorLabel: string | null;
  genderLabel: Gender | null;
  memberOfLabel: string | null;
  occupationLabel: string | null;
  skillsLabel: string | null;
}

export interface IMarvelHeroTableData extends IMarvelHeroesData {
  actions: React.ReactNode | null;
  id: string | null;
}

export interface ISubTask {
  id: number;
  isCompleted: boolean;
  note?: string;
  title: string;
}

export interface ITestTask1 {
  id: number;
  isCompleted: boolean;
  linkToMUI?: string;
  subTasks: ISubTask[];
  task: string;
}

export interface MuiTableHeaderCell<T extends object> {
  // TODO: Check if I need `align` property?
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
   * The filter values applied to this column.
   */
  filters?: Set<string> | string[] | [];
  /**
   * The title displayed in the column header cell.
   */
  headerName: string;
  /**
   * The width of the column in pixels.
   */
  width?: number;
}
