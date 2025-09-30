
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';

export const AddNewHeroButton = ({ ...props }: IconButtonProps) => {
  return (
    <Tooltip title='Add new hero'>
      <IconButton
        aria-label='marvel-hero-add'
        {...props}
      >
        <AddIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};