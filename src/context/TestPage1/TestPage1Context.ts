import type {
  Dispatch,
  SetStateAction 
} from 'react';
import {
  createContext,
  useContext 
} from 'react';

import type { HeroDataValues, IMarvelHeroesData } from 'src/interfaces';
import { initFiltersData } from './utils';
 
interface ITestPage1Context {
  data: IMarvelHeroesData[];
  filteredData: IMarvelHeroesData[];
  filters: Omit<HeroDataValues, 'id'>;
  handleDeleteFilter: ( filter: keyof Omit<HeroDataValues, 'id'>, value: string ) => void;
  handleSaveData: ( valuesToSave: Partial<IMarvelHeroesData> ) => Promise<void>;
  hasFilters: boolean;
  initFiltersData: Omit<HeroDataValues, 'id'>;
  isModalOpen: boolean;
  selectedData: IMarvelHeroesData | null;
  setFilters: Dispatch<SetStateAction<Omit<HeroDataValues, 'id'>>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedData: Dispatch<SetStateAction<IMarvelHeroesData | null>>;
}

export const TestPage1Context = createContext<ITestPage1Context>({
  data: [],
  filteredData: [],
  filters: initFiltersData,
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