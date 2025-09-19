import { useEffect, useState, type SyntheticEvent } from 'react';

import Grid from '@mui/material/Grid';
import {
  useMediaQuery, useTheme,
  type AutocompleteChangeDetails,
  type AutocompleteChangeReason
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useTestPage1Context } from 'src/context';
import type { Gender, IMarvelHeroesData, MarvelHeroFilterValues } from 'src/interfaces';
import { isEmptyObject } from 'src/utils';

import { BasicAutocomplete } from 'src/components/Atoms';
import { ModalFooter, ModalHeader } from '../components';

import type { MarvelHeroesFiltersModalProps } from './MarvelHeroesFiltersModalProps';

export const MarvelHeroesFiltersModal = ({
  onClose,
  open = false,
}: MarvelHeroesFiltersModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // TODO: Optimize with add translation
  const LABELS: {[key in keyof IMarvelHeroesData]: string} = {
    nameLabel: 'Name',
    genderLabel: 'Gender',
    citizenshipLabel: 'Citizenship',
    skillsLabel: 'Skills',
    occupationLabel: 'Occupation',
    memberOfLabel: 'Member of',
    creatorLabel: 'Creator'
  } as const;

  const {
    data,
    filters,
    initFiltersData,
    setFilters,
  } = useTestPage1Context();

  const [ heroFilterValues, setHeroFilterValues ] = useState<MarvelHeroFilterValues>(initFiltersData);
  const [ isDataChanged, setIsDataChanged ] = useState(false);
  const [ autocompleteFilters, setAutocompleteFilters ] = useState<MarvelHeroFilterValues>(initFiltersData);

  useEffect(() => {
    if (!isEmptyObject(data)) {
      const names = data?.map(item => item.nameLabel).filter((v): v is string => !!v).sort() ?? [];
       const genders = data?.map(item => item.genderLabel).filter((v): v is Gender => !!v) ?? [];

      setHeroFilterValues((prevValues: MarvelHeroFilterValues) => ({
        ...prevValues,
        nameLabel: new Set(names),
        genderLabel: new Set(genders),
      }));
    }
  }, [ data ]);

  useEffect(() => {
    if(open) {
      setAutocompleteFilters(filters);
    }
  }, [open]);

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: (string[] | number[])[],
    _reason: AutocompleteChangeReason,
    field: string,
    _details?: AutocompleteChangeDetails<string[] | number[]>,
  ) => {
    setAutocompleteFilters((prevValues: MarvelHeroFilterValues) => ({
      ...prevValues,
      [field]: value || []
    }));
    setIsDataChanged(true);
  };

  const handleClose = () => {
    setIsDataChanged(false);
    onClose();
  };

  const handleSubmit = async () => {
    setFilters(autocompleteFilters);
    handleClose();
  };

  return (
    <Dialog
      fullScreen={ fullScreen }
      fullWidth
      maxWidth='sm'
      open={ open }
      onClose={ handleClose }
    >
      <ModalHeader
        onClose={ handleClose }
        title='Marvel Heroes Filters'
      />
      <DialogContent dividers>
        <Grid
          container
          spacing={ 2 }
        >
          {
            (['nameLabel', 'genderLabel'] as const).map((item) => (
              <Grid
                key={`filters-${item}`}
                size={ 12 }
              >
                <BasicAutocomplete
                  disabled={ [ ...heroFilterValues[`${item}`] ].length === 0 }
                  id={`basic-autocomplete-${item}`}
                  label={LABELS[item]}
                  onChange={(event, value, reason, details) =>
                    handleChange(event, value, reason, `${item}`,  details)
                  }
                  options={
                    Array.isArray(heroFilterValues[`${item}`])
                      ? [ ...heroFilterValues[`${item}`] ].map(name => [name])
                      : Array.from(heroFilterValues[`${item}`]).map(name => [name])
                  }
                  size='small'
                  value={[ ...autocompleteFilters[`${item}`] ] as any} // Todo: fix any
                />
              </Grid>
            ))
          }
        </Grid>
      </DialogContent>
      <ModalFooter
        isDisabled={ !isDataChanged }
        onClose={ handleClose }
        onSubmit={ handleSubmit }
        submitButtonText='Apply'
      />
    </Dialog>
  );
};
