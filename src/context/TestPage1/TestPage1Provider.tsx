import type { ReactNode } from 'react';
import {
  useEffect,
  useState
} from 'react';
import { v4 } from 'uuid';

import type { IMarvelHeroesData } from 'src/interfaces';

import { TestPage1Context } from './TestPage1Context';

interface ITestPage1ProviderProps {
  children?: ReactNode;
  initData?: IMarvelHeroesData[];
}

export const TestPage1Provider = ({
  children,
  initData
}: ITestPage1ProviderProps) => {
  const [ data, setData ] = useState<IMarvelHeroesData[]>([]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ filteredData, setFilteredData ] = useState<IMarvelHeroesData[]>([]);
  const [ selectedData, setSelectedData ] = useState<IMarvelHeroesData | null>(null);

  useEffect(() => {
    if (!initData || initData?.length === 0) {
      return;
    }

    const _data =  initData
      .map((item: IMarvelHeroesData) => {
        return {
          ...item,
          id: v4() // Ensure unique IDs,
        };
      });
    setData(_data);
  }, [ initData ]);

  const handleSaveData = async ( valuesToSave: Partial<IMarvelHeroesData> ) => {
    // console.log('valuesToSave', valuesToSave);
    const updatedData = data.map(item => {
      if (item.id === valuesToSave.id) {
        return {
          ...item,
          ...valuesToSave
        };
      }
      return item;
    });
    setData(updatedData);
  }

  const contextValue = {
    data,
    filteredData,
    handleSaveData,
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
