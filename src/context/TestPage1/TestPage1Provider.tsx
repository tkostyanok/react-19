import type { ReactNode } from 'react';
import {
  useCallback, useEffect, useMemo, useRef, useState 
} from 'react';

import apiTestPage1 from 'src/api/apiTestPage1';
import type {
  Gender,
  IMarvelHeroesData,
  IMarvelHeroesDataTable,
  MarvelHeroFilterValues,
  TDataUsage,
} from 'src/interfaces';
import { ensureStringArray } from 'src/utils';
import { v4 } from 'uuid';

import { DeleteHeroButton } from './components';
import { TestPage1Context } from './TestPage1Context';
import {
  initialFiltersData, initialMarvelHero 
} from './utils';

interface ITestPage1ProviderProps {
  children?: ReactNode;
  initData?: IMarvelHeroesData[];
}

export const TestPage1Provider = ({
  children, initData 
}: ITestPage1ProviderProps) => {
  const prevInitJsonRef = useRef<string | null>(null);
  const prevDataUsageRef = useRef<TDataUsage>('local');

  /** *******************************  State Variables  ****************************************** */

  const [ data, setData ] = useState<IMarvelHeroesDataTable[]>([]);
  const [ dataUsage, setDataUsage ] = useState<TDataUsage>('local');
  const [ filters, setFilters ] = useState<MarvelHeroFilterValues>(initialFiltersData);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedData, setSelectedData ] = useState<IMarvelHeroesDataTable | null>(null);

  /** *********************************  Functions  ******************************************** */

  // Delete data locally
  const handleDeleteDataLocal = useCallback((dataToDelete: IMarvelHeroesDataTable) => {
    setData((prevData) => prevData.filter((item) => item.id !== dataToDelete.id));
  }, []);

  // Delete data remotely
  const handleDeleteDataRemote = useCallback(async (dataToDelete: IMarvelHeroesDataTable) => {
    await apiTestPage1
      .deleteHero(dataToDelete.id as string)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== dataToDelete.id));
      })
      .catch((error: unknown) => {
        console.error('Error deleting hero remotely:', error);
        // TODO: show notification
      });
  }, []);

  // Delete filter value
  const handleDeleteFilter = useCallback((filter: keyof MarvelHeroFilterValues, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: [ ...prevFilters[filter] ].filter((item) => item !== value),
    }));
  }, []);

  // Create or Update data locally
  const handleSaveDataLocal = useCallback(
    (dataToSave: Partial<IMarvelHeroesDataTable>) => {
      setData((prevData) => {
        const newHeroData: IMarvelHeroesDataTable | null =
          dataToSave.id === null
            ? ({
              ...dataToSave,
              actions: null,
              id: v4(),
            } as IMarvelHeroesDataTable)
            : null;

        const newHeroTableData: IMarvelHeroesDataTable | null =
          newHeroData !== null
            ? {
              ...newHeroData,
              actions: (
                <DeleteHeroButton
                  dataToDelete={newHeroData}
                  onDelete={() => handleDeleteDataLocal(newHeroData)}
                />
              ),
            }
            : null;

        if (newHeroTableData !== null) {
          return [ newHeroTableData, ...prevData ];
        }

        return prevData.map((item) =>
          item.id === dataToSave.id
            ? {
              ...item,
              ...dataToSave,
            }
            : item,
        );
      });
    },
    [ handleDeleteDataLocal ],
  );

  // Create or Update data remotely
  const handleSaveDataRemote = useCallback(
    async (dataToSave: Partial<IMarvelHeroesDataTable>) => {
      const newHeroData: IMarvelHeroesDataTable | null =
        dataToSave.id === null
          ? await apiTestPage1
            .createHero({
              ...dataToSave,
            } as IMarvelHeroesData)
            .then((createdHero: Omit<IMarvelHeroesDataTable, 'actions'>) => {
              return {
                ...createdHero,
                actions: null,
              } as IMarvelHeroesDataTable;
            })
            .catch((error: unknown) => {
              console.error('Error creating hero remotely:', error);
              // TODO: show notification
              return null;
            })
          : await apiTestPage1
            .updateHero(dataToSave.id as string, dataToSave)
            .then((updatedHero: Omit<IMarvelHeroesDataTable, 'actions'>) => {
              return {
                ...updatedHero,
                actions: null,
              } as IMarvelHeroesDataTable;
            })
            .catch((error: unknown) => {
              console.error('Error updating hero remotely:', error);
              // TODO: show notification
              return null;
            });

      const newHeroTableData: IMarvelHeroesDataTable | null =
        newHeroData !== null
          ? {
            ...newHeroData,
            actions: (
              <DeleteHeroButton
                dataToDelete={newHeroData}
                id={`${newHeroData.id}-delete-button`}
                onDelete={() => handleDeleteDataRemote(newHeroData)}
              />
            ),
          }
          : null;

      if (newHeroTableData !== null) {
        return setData((prevData) => [ newHeroTableData, ...prevData ]);
      }

      return setData((prevData) => {
        return prevData.map((item) =>
          item.id === dataToSave.id
            ? {
              ...item,
              ...dataToSave,
            }
            : item,
        );
      });
    },
    [ handleDeleteDataRemote ],
  );

  // Filter data based on current filters
  const {
    filteredData, hasFilters 
  } = useMemo(() => {
    let _filteredData = data;
    let _hasFilters = false;

    // filter by name
    if (filters?.name && ensureStringArray(filters.name).length !== 0) {
      const selectedNames = ensureStringArray(filters.name);
      _filteredData = _filteredData.filter((item) => selectedNames.includes(item.name as string));
      _hasFilters = true;
    }

    // filter by gender
    if (filters?.gender && ensureStringArray(filters.gender).length !== 0) {
      const selectedGenders = ensureStringArray(filters.gender) as unknown as Gender[];
      _filteredData = _filteredData.filter((item) => selectedGenders.includes(item.gender as Gender));
      _hasFilters = true;
    }

    return {
      filteredData: _hasFilters ? _filteredData : [],
      hasFilters: _hasFilters,
    };
  }, [ data, filters ]);

  // Set Data Usage change effect and reset filters
  const setDataUsageAndResetFilters = useCallback(
    (dataUsage: TDataUsage) => {
      if (prevDataUsageRef.current !== dataUsage) {
        setFilters(initialFiltersData);
        prevDataUsageRef.current = dataUsage;
      }
      setDataUsage(dataUsage);
    },
    [ setFilters ],
  );

  /** ************************  Initialization and Effects  ************************************ */

  // Set initial data, if data usage is 'local'
  useEffect(() => {
    if (dataUsage === 'local') {
      return setData((prevData) => {
        // Skip if current data identical to previous data
        const initJson = initData ? JSON.stringify(initData) : '';
        if (prevInitJsonRef.current === initJson) return prevData;

        // Update ref
        prevInitJsonRef.current = initJson;

        // Clear data if initData is empty
        if (!initData || initData?.length === 0) {
          return prevData.length !== initData?.length ? [] : prevData;
        }

        // Set new data
        return initData.map((item: IMarvelHeroesData) => {
          const hero = {
            ...item,
            actions: null,
            id: v4(), // Ensure unique IDs,
          };
          return {
            ...hero,
            actions: (
              <DeleteHeroButton
                dataToDelete={hero}
                id={`${hero.id}-delete-button`}
                onDelete={() => handleDeleteDataLocal(hero)}
              />
            ),
          };
        });
      });
    }
  }, [ dataUsage, initData, handleDeleteDataLocal ]);

  // Set initial data if data usage id 'remote'
  useEffect(() => {
    if (dataUsage === 'remote') {
      apiTestPage1
        .getAllHeroes()
        // Note1: next fetch for test and checking data in console
        // Note2: should be removed later
        .then((fetchedData: Omit<IMarvelHeroesDataTable, 'actions'>[]) => {
          console.log('Fetched remote data:', fetchedData);
          return fetchedData;
        })
        .then((fetchedData: Omit<IMarvelHeroesDataTable, 'actions'>[]) => {
          if (!fetchedData || fetchedData.length === 0) {
            setData([]);
            return;
          }

          const tableData: IMarvelHeroesDataTable[] = fetchedData.map(
            (item: Omit<IMarvelHeroesDataTable, 'actions'>) => {
              const hero: IMarvelHeroesDataTable = {
                ...item,
                actions: null,
              };
              return {
                ...hero,
                actions: (
                  <DeleteHeroButton
                    dataToDelete={hero}
                    id={`${hero.id}-delete-button`}
                    onDelete={() => handleDeleteDataRemote(hero)}
                  />
                ),
              };
            },
          );

          setData(tableData);
        })
        .catch((error: unknown) => {
          console.error('Error fetching remote data:', error);
          // TODO: show notification
          setData([]);
        });
    }
  }, [ dataUsage, initData, handleDeleteDataRemote ]);

  const contextValue = {
    data,
    dataUsage,
    filteredData,
    filters,
    handleDeleteFilter,
    handleSaveDataLocal,
    handleSaveDataRemote,
    hasFilters,
    initialFiltersData,
    initialMarvelHero,
    isModalOpen,
    selectedData,
    setDataUsage: setDataUsageAndResetFilters,
    setFilters,
    setIsModalOpen,
    setSelectedData,
  };

  return <TestPage1Context.Provider value={contextValue}>{children}</TestPage1Context.Provider>;
};
