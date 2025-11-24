import type {
  Dispatch, SetStateAction 
} from 'react';
import {
  createContext, useContext 
} from 'react';

import type {
  IMarvelHeroesDataTable, MarvelHeroFilterValues, TDataUsage 
} from 'src/interfaces';

import {
  initialFiltersData, initialMarvelHero 
} from './utils';

interface ITestPage1Context {
  data: IMarvelHeroesDataTable[];
  dataUsage: TDataUsage;
  filteredData: IMarvelHeroesDataTable[];
  filters: MarvelHeroFilterValues;
  handleDeleteFilter: (filter: keyof MarvelHeroFilterValues, value: string) => void;
  /**
   * Function calls to save data locally
   */
  handleSaveDataLocal: (dataToSave: Partial<IMarvelHeroesDataTable>) => void;
  /**
   * Function calls to save data remotely
   */
  handleSaveDataRemote: (dataToSave: Partial<IMarvelHeroesDataTable>) => Promise<void>;
  hasFilters: boolean;
  initialFiltersData: MarvelHeroFilterValues;
  initialMarvelHero: IMarvelHeroesDataTable;
  isModalOpen: boolean;
  selectedData: IMarvelHeroesDataTable | null;
  setDataUsage: (dataUsage: TDataUsage) => void;
  setFilters: Dispatch<SetStateAction<MarvelHeroFilterValues>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedData: Dispatch<SetStateAction<IMarvelHeroesDataTable | null>>;
}

export const TestPage1Context = createContext<ITestPage1Context>({
  data: [],
  dataUsage: 'local',
  filteredData: [],
  filters: initialFiltersData,
  handleDeleteFilter: () => {},
  handleSaveDataLocal: () => {},
  handleSaveDataRemote: async () => {},
  hasFilters: false,
  initialFiltersData: initialFiltersData,
  initialMarvelHero: initialMarvelHero,
  isModalOpen: false,
  selectedData: null,
  setDataUsage: () => {},
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
