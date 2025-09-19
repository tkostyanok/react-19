import {
  DataGrid,
  type DataGridProps 
} from '@mui/x-data-grid';
import { GREY_100 } from 'src/constants/colors';

/**
 * XDataGridTable component is a wrapper around MUI's DataGrid and does not 
 *   implement any additional functionality.
 * It provides a customized data grid with specific styles and properties.
 * It is used to maintain consistency in the codebase and to apply specific styles.
 *
 * @see https://mui.com/x/react-data-grid/
 * @see https://mui.com/x/api/data-grid/data-grid/

* @param props - The properties to pass to the DataGrid component.
 * 
 * @returns A DataGrid component with customized styles and properties.
 */
export const XDataGridTable = <T extends object>({ ...props }: DataGridProps<T>) => {
  return (
    <DataGrid
      initialState={ {
        pagination: {
          paginationModel: {
            pageSize: 10, 
          } 
        }, 
      } }
      rowHeight={ 60 }
      pageSizeOptions={ [ 10, 20, 50 ] }
      sx={ {
        minHeight: 400,
        '& .MuiDataGrid-virtualScroller': {
          minHeight: 270, 
        },
        '& .MuiDataGrid-row': {
          '&:nth-of-type(2n)': {
            backgroundColor: GREY_100 
          }, 
        },
      } }
      { ...props }
    />
  );
};
