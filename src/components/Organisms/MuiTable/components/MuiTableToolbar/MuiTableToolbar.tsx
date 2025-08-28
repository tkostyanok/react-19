import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import FilterListIcon from '@mui/icons-material/FilterList';

import type { MuiTableToolbarProps } from './MuiTableToolbarProps';

export const MuiTableToolbar = ({ title = '' }: MuiTableToolbarProps) => {
  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {title !== ''  ? (
          <Typography
            color='inherit'
            component='div'
            sx={{
              flex: '1 1 100%' 
            }}
            variant='subtitle1'
          >
            {title} 
          </Typography>
        ) : (
          null
        )}
      </div>
      
      <Tooltip title='Filters'>
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};
