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

export const TestPage1Provider = ({ children, data }: ITestPage1ProviderProps) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedData, setSelectedData ] = useState<IMarvelHeroesData | null>(null);

  console.log('Provider isModalOpen', isModalOpen);

  const initData = useMemo(() => {
    if (data?.length === 0) {
      return [];
    }

    if (!data) {
      return [];
    }

    return data
      .map((item: IMarvelHeroesData) => {
        return {
          ...item,
          id: item.nameLabel,
        };
      });
  }, [ data ]);

  const contextValue = {
    initData,
    isModalOpen,
    selectedData,
    setIsModalOpen,
    setSelectedData
  };

  return (
    <TestPage1Context.Provider value={ contextValue }>
      {children}
    </TestPage1Context.Provider>
  );
};
