import { useState } from 'react';

import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';

import { MarvelHeroesFiltersModal } from 'src/components/Modals';

export const MarvelHeroesFilters = ({ ...props }: IconButtonProps) => {
  const [ openFiltersModal, setOpenFiltersModal ] = useState(false);
  
  return (
    <>
      <Tooltip title='Filters'>
        <IconButton
          onClick={() => setOpenFiltersModal(true)}
          {...props}
        >
          <FilterListIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <MarvelHeroesFiltersModal
        open={ openFiltersModal }
        onClose={() => setOpenFiltersModal(false)}
      />
    </>
  );
}
