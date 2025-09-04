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
  filters: HeroDataValues;
  handleSaveData: ( valuesToSave: Partial<IMarvelHeroesData> ) => Promise<void>;
  hasFilters: boolean;
  initFiltersData: HeroDataValues;
  isModalOpen: boolean;
  selectedData: IMarvelHeroesData | null;
  setFilters: Dispatch<SetStateAction<HeroDataValues>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedData: Dispatch<SetStateAction<IMarvelHeroesData | null>>;
}

export const TestPage1Context = createContext<ITestPage1Context>({
  data: [],
  filteredData: [],
  filters: initFiltersData,
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