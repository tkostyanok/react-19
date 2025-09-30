import {
  useCallback, useMemo, useState 
} from 'react';

import Stack from '@mui/material/Stack';

import {
  MarvelHeroesFiltersModal, MarvelHeroModal 
} from 'src/components/Modals';
import { MuiTable } from 'src/components/Organisms/MuiTable';
import { useTestPage1Context } from 'src/context';
import type { IMarvelHeroTableData } from 'src/interfaces';

import { headerCells } from './utils/helper';
import {
  AddNewHeroButton, FiltersButton 
} from './components';

export const MuiTableTab = () => {
  const {
    data,
    filters,
    filteredData,
    handleDeleteFilter,
    handleSaveData,
    hasFilters,
    isModalOpen,
    selectedData,
    setIsModalOpen,
    setSelectedData,
  } = useTestPage1Context();

  const [ isNewHero, setIsNewHero ] = useState(false);
  const [ openFiltersModal, setOpenFiltersModal  ] = useState(false);

  const _headerCells = useMemo(() => {
    return headerCells.map(cell => ({
      ...cell,
      filters: filters[cell.field as keyof typeof filters]
    }));
  }, [ filters ]);

  const handleAddMarvelHero = () => {
    setSelectedData(null);
    setIsNewHero(true);
    setIsModalOpen(isModalOpen => !isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
    setIsNewHero(false);
  };

  const handleRowClick = useCallback((data: IMarvelHeroTableData) => {
    setSelectedData(prevData => ({
      ...prevData,
      ...data 
    }));
    setIsNewHero(false);
    setIsModalOpen(isModalOpen => !isModalOpen);
  }, [ setSelectedData, setIsNewHero, setIsModalOpen ]);

  return (
    <>
      <MuiTable<IMarvelHeroTableData>
        headerCells={_headerCells}
        onFilterClick={setOpenFiltersModal}
        onFilterDelete={handleDeleteFilter as (filter: keyof IMarvelHeroTableData, value: string) => void}
        onRowClick={ handleRowClick }
        rowsData={hasFilters ? filteredData : data}
        toolbarChildren={
          <Stack
            direction='row'
            spacing={1}
          >
            <AddNewHeroButton
              disabled={/*isLoading ||*/ false}
              onClick={handleAddMarvelHero}
            />
            <FiltersButton
              disabled={/*isLoading ||*/ !data || data?.length === 0}
              openModal={setOpenFiltersModal}
            />
          </Stack>
        }
      />
      <MarvelHeroModal
        data={ selectedData }
        isNewHero={ isNewHero }
        onClose={ handleCloseModal }
        onSave={ handleSaveData }
        open={ isModalOpen }
      />
      <MarvelHeroesFiltersModal
        open={ openFiltersModal }
        onClose={() => setOpenFiltersModal(false)}
      />
    </>
  );
};