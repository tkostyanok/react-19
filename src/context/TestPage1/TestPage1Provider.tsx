import type { ReactNode } from 'react';
import {
  useEffect,
  useState
} from 'react';
import { v4 } from 'uuid';

import type { Gender, HeroDataValues, IMarvelHeroesData } from 'src/interfaces';
import { initFiltersData } from './utils';

import { TestPage1Context } from './TestPage1Context';

interface ITestPage1ProviderProps {
  children?: ReactNode;
  initData?: Omit<IMarvelHeroesData, 'id'>[];
}

export const TestPage1Provider = ({
  children,
  initData
}: ITestPage1ProviderProps) => {
  const [ data, setData ] = useState<IMarvelHeroesData[]>([]);
  const [ hasFilters, setHasFilters ] = useState(false);
  const [ filters, setFilters ] = useState<Omit<HeroDataValues, 'id'>>(initFiltersData);
  const [ filteredData, setFilteredData ] = useState<IMarvelHeroesData[]>([]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedData, setSelectedData ] = useState<IMarvelHeroesData | null>(null);

  useEffect(() => {
    if (!initData || initData?.length === 0) {
      return;
    }

    const _data =  initData
      .map((item: Omit<IMarvelHeroesData, 'id'>) => {
        return {
          ...item,
          id: v4() // Ensure unique IDs,
        };
      });
    setData(_data);
  }, [ initData ]);

  useEffect(() => {
    let _filteredData = data;

    let _hasFilters = false;
    if ([ ...filters?.nameLabel ].length !== 0) {
      const selectedNames = [ ...filters.nameLabel ].flat(Infinity);
      _filteredData = [ ..._filteredData ].filter(item => selectedNames.includes(item.nameLabel as string));
      _hasFilters = true;
    }
    if ([ ...filters?.genderLabel ].length !== 0) {
      const selectedGenders = [ ...filters.genderLabel ].flat(Infinity);
      _filteredData = [ ..._filteredData ].filter(item => selectedGenders.includes(item.genderLabel as Gender));
      _hasFilters = true;
    }
    setFilteredData(_filteredData);
    setHasFilters(_hasFilters);
  }, [ filters ]);

  const handleDeleteFilter = (filter: keyof Omit<HeroDataValues, 'id'>, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filter]: [ ...prevFilters[filter] ].filter(item => item !== value)
    }));
  };

  // Save or Update data
  const handleSaveData = async ( valuesToSave: Partial<IMarvelHeroesData> ) => {
    const updatedData = await valuesToSave.id === null
      ? [
          {
            ...valuesToSave,
            id: v4() // Ensure unique IDs
          } as IMarvelHeroesData,
          ...data
        ]

      : data.map(item => {
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
    filters,
    handleDeleteFilter,
    handleSaveData,
    hasFilters,
    initFiltersData,
    isModalOpen,
    selectedData,
    setFilters,
    setIsModalOpen,
    setSelectedData
  };

  return (
    <TestPage1Context.Provider value={ contextValue }>
      {children}
    </TestPage1Context.Provider>
  );
};
