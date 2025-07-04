import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

/**
 * BasicInput loading skeleton.
 */
export const BasicInputLoading = () => {
  return (
    <Box
      display='flex'
      gap={ 2 }
      mb={ 1 }
      width='100%'
    >
      <Skeleton
        variant='rounded'
        height={ 40 }
        width='100%'
      />
    </Box>
  );
};
