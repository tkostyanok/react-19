import type {
  Dispatch,
  SetStateAction 
} from 'react';
import {
  createContext,
  useContext 
} from 'react';

import type { IMarvelHeroTableData, MarvelHeroFilterValues } from 'src/interfaces';
import { initFiltersData } from './utils';
 
interface ITestPage1Context {
  data: IMarvelHeroTableData[];
  filteredData: IMarvelHeroTableData[];
  filters: MarvelHeroFilterValues;
  handleDeleteData: ( dataToDelete: IMarvelHeroTableData ) => void;
  handleDeleteFilter: ( filter: keyof MarvelHeroFilterValues, value: string ) => void;
  handleSaveData: ( dataToSave: Partial<IMarvelHeroTableData> ) => Promise<void>;
  hasFilters: boolean;
  initFiltersData: MarvelHeroFilterValues;
  isModalOpen: boolean;
  selectedData: IMarvelHeroTableData | null;
  setFilters: Dispatch<SetStateAction<MarvelHeroFilterValues>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedData: Dispatch<SetStateAction<IMarvelHeroTableData | null>>;
}

export const TestPage1Context = createContext<ITestPage1Context>({
  data: [],
  filteredData: [],
  filters: initFiltersData,
  handleDeleteData: () => {},
  handleDeleteFilter: () => {},
  handleSaveData: async () => {},
  hasFilters: false,
  initFiltersData: initFiltersData,
  isModalOpen: false,
  selectedData: null,
  setFilters: () => {},
  setIsModalOpen: () => {},
  setSelectedData: () => {},
});

export const useTestPage1Context = () => {
  const context = useContext(TestPage1Context);
  if (!context) {
    throw new Error('useTestPage1Context must be used within an TestPage1Provider');
  }
  return context;
};