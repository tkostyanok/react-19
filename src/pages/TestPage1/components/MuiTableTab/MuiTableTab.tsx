import { useState } from 'react';
import { Stack } from '@mui/material';

import { useTestPage1Context } from 'src/context';
import type { IMarvelHeroesData } from 'src/interfaces';
import { headerCells } from './utils/helper';

import { MuiTable } from 'src/components/Organisms/MuiTable';
import { MarvelHeroModal } from 'src/components/Modals';
import { MarvelHeroesFilters, MarvelHeroNew } from './components';

export const MuiTableTab = () => {
  const {
    data,
    filteredData,
    handleSaveData,
    hasFilters,
    isModalOpen,
    selectedData,
    setIsModalOpen,
    setSelectedData,
  } = useTestPage1Context();

  const [ isNewHero, setIsNewHero ] = useState(false);

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

  const handleRowClick = (data: IMarvelHeroesData) => {
    setSelectedData(prevData => ({
      ...prevData,
      ...data 
    }));
    setIsNewHero(false);
    setIsModalOpen(isModalOpen => !isModalOpen);
  };

  return (
    <>
      <MuiTable
        headerCells={headerCells}
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
    </>
  );
};