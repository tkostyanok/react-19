import { MuiTable } from 'src/components/Organisms/MuiTable';
import { useTestPage1Context } from 'src/context';

import type { IMarvelHeroesData } from 'src/interfaces';
import { headerCells } from './utils/helper';

import { MarvelHeroModal } from 'src/components/Modals';
import { MarvelHeroesFilters } from './components';

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

  const handleRowClick = (data: IMarvelHeroesData) => {
    setSelectedData(prevData => ({
      ...prevData,
      ...data 
    }));
    setIsModalOpen(isModalOpen => !isModalOpen);
  };

  console.log('hasFilters', hasFilters);
  return (
    <>
      <MuiTable
        headerCells={headerCells}
        onRowClick={ handleRowClick }
        rowsData={hasFilters ? filteredData : data}
        toolbarChildren={
          <MarvelHeroesFilters
            isDisabled={/*isLoading ||*/ !data || data?.length === 0}
          />
        }
      />
      <MarvelHeroModal
        data={ selectedData }
        onClose={ () => setIsModalOpen(false) }
        onSave={ handleSaveData }
        open={ isModalOpen }
      />
    </>
  );
};