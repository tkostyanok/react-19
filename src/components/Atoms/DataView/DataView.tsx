import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { GREY_600 } from 'src/constants/colors';

import { BasicLabel } from '../BasicLabel';

import { DataViewLoading } from './DataViewLoading';
import type { DataViewProps } from './DataViewProps';

export const DataView = ({
  isLoading = false,
  label,
  value,
}: DataViewProps) => {
  if( isLoading ) {
    return (
      <DataViewLoading />
    );
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
    >
      <BasicLabel label={ label } />
      <Typography
        color={ GREY_600 }
        sx={ {
          overflow: 'hidden',
          py: '2px',
          textOverflow: 'ellipsis',
          whiteSpace: 'pre-line',
        } }
        variant='body1'
      >
        {value}
      </Typography>
    </Box>
  );
};
