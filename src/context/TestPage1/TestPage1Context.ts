import { useContext, createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import type { IMarvelHeroesData } from '../../interfaces';

interface ITestPage1Context {
  initData: IMarvelHeroesData[];
  isModalOpen: boolean;
  selectedData: IMarvelHeroesData | null;
  // handleIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedData: Dispatch<SetStateAction<IMarvelHeroesData | null>>;
}

export const TestPage1Context = createContext<ITestPage1Context>({
  initData: [],
  isModalOpen: false,
  selectedData: null,
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