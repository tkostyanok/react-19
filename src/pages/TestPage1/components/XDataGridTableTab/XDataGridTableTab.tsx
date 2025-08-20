import { useMemo } from 'react';

import { GridLogicOperator } from '@mui/x-data-grid';

import { MarvelHeroModal } from 'src/components/Modals';
import { XDataGridTable } from 'src/components/Organisms';
import { useTestPage1Context } from 'src/context';
import type { IMarvelHeroesData } from 'src/interfaces';

import { columnsDefault as initColumnsDefault } from './utils/helper';

/**
 * XDataGridTableTab displays a `X DataGrid` table component.
 */
export const XDataGridTableTab = () => {
  const {
    initData,
    isModalOpen,
    selectedData,
    setIsModalOpen,
    setSelectedData,
  } = useTestPage1Context();

  console.log('initData', initData);
  console.log('isModalOpen', isModalOpen);

  const columnsDefault = useMemo(() => initColumnsDefault, []);

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
      <XDataGridTable<IMarvelHeroesData>
        columns={ columnsDefault }
        filterModel={ {
          // items: [ ...dataFiltered ],
          // items: [ ...initData ],
          items: [],
          logicOperator: GridLogicOperator.And,
          quickFilterValues: [],
          quickFilterLogicOperator: GridLogicOperator.And,
          quickFilterExcludeHiddenColumns: true,
        } }
        loading={ false }
        onRowClick={ handleRowClick }
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
