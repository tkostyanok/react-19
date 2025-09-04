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
  initData?: IMarvelHeroesData[];
}

export const TestPage1Provider = ({
  children,
  initData
}: ITestPage1ProviderProps) => {
  const [ data, setData ] = useState<IMarvelHeroesData[]>([]);
  const [ hasFilters, setHasFilters ] = useState(false);
  const [ filters, setFilters ] = useState<HeroDataValues>(initFiltersData);
  const [ filteredData, setFilteredData ] = useState<IMarvelHeroesData[]>([]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
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

  useEffect(() => {
    let _filteredData = data;

    let _hasFilters = false;
    if ([ ...filters?.names ].length !== 0) {
      const selectedNames = [ ...filters.names ].flat(Infinity);
      _filteredData = [ ..._filteredData ].filter(item => selectedNames.includes(item.nameLabel as string));
      _hasFilters = true;
    }
    if ([ ...filters?.genders ].length !== 0) {
      const selectedGenders = [ ...filters.genders ].flat(Infinity);
      _filteredData = [ ..._filteredData ].filter(item => selectedGenders.includes(item.genderLabel as Gender));
      _hasFilters = true;
    }
    setFilteredData(_filteredData);
    setHasFilters(_hasFilters);
  }, [ filters ]);

  const handleSaveData = async ( valuesToSave: Partial<IMarvelHeroesData> ) => {
    const updatedData = await data.map(item => {
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
