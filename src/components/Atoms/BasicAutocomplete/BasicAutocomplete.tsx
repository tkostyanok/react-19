
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type { AutocompleteProps } from '@mui/material';

import { BasicLabel } from '../BasicLabel';
import type { BasicAutocompleteProps } from './BasicAutocompleteProps';

export const BasicAutocomplete = ({
  label,
  options,
  ...props
}: BasicAutocompleteProps & Omit<AutocompleteProps<number[] | string[], true, true , false>, 'renderInput'>) => {
  return (
    <Box>
      <BasicLabel label={label} />
      <Autocomplete
        multiple
        disableCloseOnSelect
        getOptionLabel={(option) => option[0] as string}
        isOptionEqualToValue={(option, value) => option[0] === value[0]}
        options={options}
        renderInput={(params) => (
          <TextField 
            {...params}
            placeholder='Search'
          />
        )}
        { ...props }
      />
    </Box>
  );
};
