import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import type { MuiTableToolbarProps } from './MuiTableToolbarProps';

export const MuiTableToolbar = ({ 
  children,
  title = ''
}: MuiTableToolbarProps) => {
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
      
      <div>
        {children}
      </div>
    </Toolbar>
  );
};
