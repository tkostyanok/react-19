import { useMemo } from 'react';

import { MarvelHeroModal } from 'src/components/Modals';
import { DataTable } from 'src/components/Organisms';
import { useTestPage1Context } from 'src/context';
import type { IMarvelHeroesData } from 'src/interfaces';

import { columnsDef as initColumnsDef } from './utils/helper';

/**
 * TestPageData Component.
 * Displays a data table with Marvel heroes and a modal for hero details.
 */
export const TestPageData = () => {
  const {
    initData,
    isModalOpen,
    selectedData,
    setIsModalOpen,
    setSelectedData,
  } = useTestPage1Context();

  console.log('initData', initData);
  console.log('isModalOpen', isModalOpen);

  const columnsDef = useMemo(() => initColumnsDef, []);

  const handleRowClick= (params: { row: IMarvelHeroesData }) => {
    console.log(`row1 "${params.row.nameLabel}" clicked`);
    console.log('row data', params.row);
    setSelectedData(() => ({
      ...params.row 
    }));
    setIsModalOpen(isModalOpen => !isModalOpen);
  };

  return (
    <>
      <DataTable<IMarvelHeroesData>
        columns={ columnsDef }
        onRowClick={ handleRowClick }
        loading={ false }
        rows={ initData }
      />
      <MarvelHeroModal
        data={ selectedData }
        handleCloseModal={ () => setIsModalOpen(false) }
        open={ isModalOpen }
      />
    </>
  );
};
