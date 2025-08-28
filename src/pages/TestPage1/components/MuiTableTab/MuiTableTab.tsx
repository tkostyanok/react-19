import { MuiTable } from 'src/components/Organisms/MuiTable';
import { useTestPage1Context } from 'src/context';

import { headerCells } from './utils/helper';
import { MarvelHeroModal } from 'src/components/Modals';
import type { IMarvelHeroesData } from 'src/interfaces';

export const MuiTableTab = () => {
  const {
    initData,
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

  return (
    <>
      <MuiTable
        headerCells={headerCells}
        rowsData={initData}
        onRowClick={ handleRowClick }
      />
      <MarvelHeroModal
        data={ selectedData }
        handleCloseModal={ () => setIsModalOpen(false) }
        open={ isModalOpen }
      />
    </>
  );
};