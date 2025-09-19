import type { ReactNode } from 'react';
import {
  useCallback,
  useEffect,
  useState
} from 'react';
import { v4 } from 'uuid';

import type { Gender, IMarvelHeroesData, IMarvelHeroTableData, MarvelHeroFilterValues } from 'src/interfaces';
import { initFiltersData } from './utils';

import { TestPage1Context } from './TestPage1Context';
import { DeleteHeroButton } from './components';

interface ITestPage1ProviderProps {
  children?: ReactNode;
  initData?: IMarvelHeroesData[];
}

export const TestPage1Provider = ({
  children,
  initData
}: ITestPage1ProviderProps) => {
  const [ data, setData ] = useState<IMarvelHeroTableData[]>([]);
  const [ hasFilters, setHasFilters ] = useState(false);
  const [ filters, setFilters ] = useState<MarvelHeroFilterValues>(initFiltersData);
  const [ filteredData, setFilteredData ] = useState<IMarvelHeroTableData[]>([]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedData, setSelectedData ] = useState<IMarvelHeroTableData | null>(null);

  useEffect(() => {
    if (!initData || initData?.length === 0) {
      return;
    }

    const _data: IMarvelHeroTableData[] =  initData
      .map((item: IMarvelHeroesData) => {
        return {
          ...item,
          actions: null,
          id: v4() // Ensure unique IDs,
        };
      });

    const tableData = _data
      .map((item: IMarvelHeroTableData) => {
      return {
        ...item,
        actions: 
          <>
            <DeleteHeroButton
              dataToDelete={item}
              onDelete={() => handleDeleteData(item)}

            />
          </>,
      };
    });

    setData(tableData);
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

  const handleDeleteFilter = useCallback((filter: keyof MarvelHeroFilterValues, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filter]: [ ...prevFilters[filter] ].filter(item => item !== value)
    }));
  }, []);

  // Delete data
  const handleDeleteData = useCallback((dataToDelete: IMarvelHeroTableData) => {
    setData(prevData => prevData.filter(item => item.id !== dataToDelete.id));
  }, []);

  // Save or Update data
  const handleSaveData = useCallback(async ( dataToSave: Partial<IMarvelHeroTableData> ) => {
    const newHeroData: IMarvelHeroTableData | null = dataToSave.id === null
      ? {
        ...dataToSave,
        actions: null,
        id: v4() // Ensure unique IDs
      } as IMarvelHeroTableData
      : null;
    
    const newHeroTableData: IMarvelHeroTableData | null = newHeroData !== null
      ? {
        ...newHeroData,
        actions: 
          <>
            <DeleteHeroButton
              dataToDelete={newHeroData}
              onDelete={() => handleDeleteData(newHeroData)}
            />
          </>,
      }
      : null;
    const updatedData  = await newHeroTableData !== null
      ? [
          newHeroTableData as IMarvelHeroTableData,
          ...data
        ]

      : data.map(item => {
          if (item.id === dataToSave.id) {
            return {
              ...item,
              ...dataToSave
            };
          }
          return item;
        });
    setData(updatedData);
  }, [ data, handleDeleteData ]);

  const contextValue = {
    data,
    filteredData,
    filters,
    handleDeleteData,
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
