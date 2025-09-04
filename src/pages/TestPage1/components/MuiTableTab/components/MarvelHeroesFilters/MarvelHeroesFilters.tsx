import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';

import { MarvelHeroesFiltersModal } from 'src/components/Modals';
import type { MarvelHeroesFiltersProps } from './MarvelHeroesFiltersProps';

export const MarvelHeroesFilters = ({
  isDisabled = false
}: MarvelHeroesFiltersProps) => {
  const [ openFiltersModal, setOpenFiltersModal ] = useState(false);
  

  return (
    <>
      <Tooltip title='Filters'>
        <IconButton
          disabled={ isDisabled }
        >
          <FilterListIcon
            fontSize='small'
            onClick={() => setOpenFiltersModal(true)}
          />
        </IconButton>
      </Tooltip>
      <MarvelHeroesFiltersModal
        open={ openFiltersModal }
        onClose={() => setOpenFiltersModal(false)}
      />
    </>
  );
}
