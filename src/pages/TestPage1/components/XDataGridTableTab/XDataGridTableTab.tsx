import { useMemo } from 'react';

import { GridLogicOperator } from '@mui/x-data-grid';

import { MarvelHeroModal } from 'src/components/Modals';
import { XDataGridTable } from 'src/components/Organisms';
import { useTestPage1Context } from 'src/context';
import type { IMarvelHeroesDataTable } from 'src/interfaces';

import { columnsDefault as initColumnsDefault } from './utils/helper';

/**
 * XDataGridTableTab displays a `X DataGrid` table component.
 */
export const XDataGridTableTab = () => {
  const {
    data, handleSaveDataLocal, initialMarvelHero, isModalOpen, selectedData, setIsModalOpen, setSelectedData 
  } =
    useTestPage1Context();

  const columnsDefault = useMemo(() => initColumnsDefault, []);

  const handleRowClick = (params: { row: IMarvelHeroesDataTable }) => {
    setSelectedData(() => ({
      ...params.row,
    }));
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };

  return (
    <>
      <XDataGridTable<IMarvelHeroesDataTable>
        columns={columnsDefault}
        filterModel={{
          // items: [ ...dataFiltered ],
          // items: [ ...initData ],
          items: [],
          logicOperator: GridLogicOperator.And,
          quickFilterValues: [],
          quickFilterLogicOperator: GridLogicOperator.And,
          quickFilterExcludeHiddenColumns: true,
        }}
        loading={false}
        onRowClick={handleRowClick}
        rows={data}
      />
      <MarvelHeroModal
        // TODO: fix type issue with selectedData being null
        data={selectedData || initialMarvelHero}
        onClose={() => setIsModalOpen(false)}
        /** TODO: implement remote save */
        onSave={handleSaveDataLocal}
        open={isModalOpen}
      />
    </>
  );
};
