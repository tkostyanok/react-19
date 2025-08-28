import type { ReactNode } from 'react';
import {
  useMemo, useState 
} from 'react';

import type { IMarvelHeroesData } from 'src/interfaces';

import { TestPage1Context } from './TestPage1Context';

interface ITestPage1ProviderProps {
  children?: ReactNode;
  data?: IMarvelHeroesData[];
}

export const TestPage1Provider = ({
  children,
  data
}: ITestPage1ProviderProps) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ filteredData, setFilteredData ] = useState<IMarvelHeroesData[]>([]);
  const [ selectedData, setSelectedData ] = useState<IMarvelHeroesData | null>(null);

  const initData = useMemo(() => {
    if (!data || data?.length === 0) {
      return [];
    }

    return data;
  }, [ data ]);

  const contextValue = {
    filteredData,
    initData,
    isModalOpen,
    selectedData,
    setFilteredData,
    setIsModalOpen,
    setSelectedData
  };

  return (
    <TestPage1Context.Provider value={ contextValue }>
      {children}
    </TestPage1Context.Provider>
  );
};
