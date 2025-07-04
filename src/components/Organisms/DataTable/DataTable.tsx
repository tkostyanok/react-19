import { DataGrid, type DataGridProps } from '@mui/x-data-grid';

import { GREY_100 } from 'src/constants/colors';

/**
 * DataTable Component.
 */
export const DataTable = <T extends object>({
  ...props
}: DataGridProps<T>) => {

  return (
    <DataGrid
      // columns={columnsDef}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
            
          }
        },
      }}
      // loading={loading}
      // onRowClick={handleRowClick}
      rowHeight={60}
      // rows={rowsData}
      pageSizeOptions={[ 10, 20, 50 ]}
      // density='compact' // ??
      // disableSelectionOnClick // ??
      // onSortModelChange={(newSortModel) => setSortModel(newSortModel)} // ??
      // sortModel={sortModel} // ??

      sx={{
        minHeight: 400,
        '& .MuiDataGrid-virtualScroller': {
          minHeight: 270,
        },
        '& .MuiDataGrid-row': {
          '&:nth-of-type(2n)': { backgroundColor: GREY_100 },
        },
      }}
      { ...props }
    />
  );
};
