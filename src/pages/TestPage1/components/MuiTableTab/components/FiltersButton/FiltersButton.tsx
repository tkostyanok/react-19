import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import type { FiltersButtonProps } from './FiltersButtonProps';

export const FiltersButton = ({
  openModal,
  ...props
}: FiltersButtonProps & IconButtonProps) => {
  const handleOpenModal = () => {
    openModal(prevState => !prevState);
  };
  
  return (
    <Tooltip title='Filters'>
      <IconButton
        aria-label='marvel-heroes-filter'
        onClick={handleOpenModal}
        {...props}
      >
        <FilterListIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};
