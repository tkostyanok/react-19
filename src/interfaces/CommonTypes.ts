export type Gender = 'male' | 'female';
export type Order = 'asc' | 'desc';
export type TData = 'string' | 'number' | 'boolean' | 'date';
export type TDataUsage = 'local' | 'remote';

export interface ISelectOption {
  title: string;
  value: boolean | number | string;
}
