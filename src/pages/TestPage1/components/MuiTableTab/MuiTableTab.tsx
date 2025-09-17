import { useCallback, useMemo, useState } from 'react';
import { Stack } from '@mui/material';

import { useTestPage1Context } from 'src/context';
import type { IMarvelHeroesData } from 'src/interfaces';
import { headerCells } from './utils/helper';

import { MuiTable } from 'src/components/Organisms/MuiTable';
import { MarvelHeroesFiltersModal, MarvelHeroModal } from 'src/components/Modals';
import { MarvelHeroesFilters, MarvelHeroNew } from './components';

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
  }, [ filters, hasFilters ]);

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

  const handleRowClick = useCallback((data: IMarvelHeroesData) => {
    setSelectedData(prevData => ({
      ...prevData,
      ...data 
    }));
    setIsNewHero(false);
    setIsModalOpen(isModalOpen => !isModalOpen);
  }, [ setSelectedData, setIsNewHero, setIsModalOpen ]);

  return (
    <>
      <MuiTable<IMarvelHeroesData>
        headerCells={_headerCells}
        onFilterClick={setOpenFiltersModal}
        onFilterDelete={handleDeleteFilter as (filter: keyof IMarvelHeroesData, value: string) => void}
        onRowClick={ handleRowClick }
        rowsData={hasFilters ? filteredData : data}
        toolbarChildren={
          <Stack
            direction='row'
            spacing={1}
          >
            <MarvelHeroNew
              disabled={/*isLoading ||*/ false}
              onClick={handleAddMarvelHero}
            />
            <MarvelHeroesFilters
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