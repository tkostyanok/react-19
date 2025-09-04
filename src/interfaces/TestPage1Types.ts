import type { TableCellProps } from '@mui/material/TableCell';
import type { Gender } from './CommonTypes';

export type HeroDataValues = {
  names: Set<string> | string[] | [];
  // citizenries: Set<string> | string[] | [];
  // creators: Set<string> | string[] | [];
  genders: Set<string> | string[] | [];
  // members: Set<string> | string[] | [];
  // occupations: Set<string> | string[] | [];
  // skills: Set<string> | string[] | [];
};

export interface IMarvelHeroesData {
  nameLabel: string | null,
  citizenshipLabel: string | null,
  creatorLabel: string | null,
  genderLabel: Gender | null,
  id: string | null,
  memberOfLabel: string | null,
  occupationLabel: string | null,
  skillsLabel: string | null,
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
