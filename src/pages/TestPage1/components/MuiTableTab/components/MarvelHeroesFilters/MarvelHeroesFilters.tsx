import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import type { MarvelHeroesFiltersProps } from './MarvelHeroesFiltersProps';

export const MarvelHeroesFilters = ({
  openModal,
  ...props
}: MarvelHeroesFiltersProps & IconButtonProps) => {
  const handleOpenModal = () => {
    openModal(prevState => !prevState);
  };
  
  return (
    <Tooltip title='Filters'>
      <IconButton
        onClick={handleOpenModal}
        {...props}
      >
        <FilterListIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
}
