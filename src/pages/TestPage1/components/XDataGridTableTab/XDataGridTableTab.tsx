import { useMemo } from 'react';

import { GridLogicOperator } from '@mui/x-data-grid';

import { MarvelHeroModal } from 'src/components/Modals';
import { XDataGridTable } from 'src/components/Organisms';
import { useTestPage1Context } from 'src/context';
import type { IMarvelHeroTableData } from 'src/interfaces';

import { columnsDefault as initColumnsDefault } from './utils/helper';

/**
 * XDataGridTableTab displays a `X DataGrid` table component.
 */
export const XDataGridTableTab = () => {
  const {
    data,
    handleSaveData,
    isModalOpen,
    selectedData,
    setIsModalOpen,
    setSelectedData,
  } = useTestPage1Context();

  const columnsDefault = useMemo(() => initColumnsDefault, []);

  const handleRowClick = (params: { row: IMarvelHeroTableData }) => {
    setSelectedData(() => ({
      ...params.row 
    }));
    setIsModalOpen(isModalOpen => !isModalOpen);
  };

  return (
    <>
      <XDataGridTable<IMarvelHeroTableData>
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
        rows = { data }
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
