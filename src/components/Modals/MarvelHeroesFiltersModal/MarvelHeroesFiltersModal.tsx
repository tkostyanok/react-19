import { useEffect, useState, type SyntheticEvent } from 'react';

import {
  useMediaQuery, useTheme,
  type AutocompleteChangeDetails,
  type AutocompleteChangeReason
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useTestPage1Context } from 'src/context';
import type { Gender, HeroDataValues } from 'src/interfaces';
import { firstLetterCapitalize, isEmptyObject } from 'src/utils';

import { BasicAutocomplete } from 'src/components/Atoms';
import { ModalFooter, ModalHeader } from '../components';

import type { MarvelHeroesFiltersModalProps } from './MarvelHeroesFiltersModalProps';

export const MarvelHeroesFiltersModal = ({
  onClose,
  open = false,
}: MarvelHeroesFiltersModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const {
      data,
      filters,
      initFiltersData,
      setFilters,
    } = useTestPage1Context();

  const [ heroDataValues, setHeroDataValues ] = useState<HeroDataValues>(initFiltersData);
  const [ isDataChanged, setIsDataChanged ] = useState(false);
  const [ autocompleteFilters, setAutocompleteFilters ] = useState<HeroDataValues>(initFiltersData);

  useEffect(() => {
    if (!isEmptyObject(data)) {
      const names = data?.map(item => item.nameLabel).filter((v): v is string => !!v).sort() ?? [];
       const genders = data?.map(item => item.genderLabel).filter((v): v is Gender => !!v) ?? [];

      setHeroDataValues((prevValues: HeroDataValues) => ({
        ...prevValues,
        names: new Set(names),
        genders: new Set(genders),
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
    setAutocompleteFilters((prevValues: HeroDataValues) => ({
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
    // console.log('Filters applied:', heroDataValues);
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
        {
          (['names', 'genders'] as const).map((item) => (
            <BasicAutocomplete
              disabled={ [ ...heroDataValues[`${item}`] ].length === 0 }
              id={`${item}`}
              label={firstLetterCapitalize(`${item}`)}
              onChange={(event, value, reason, details) =>
                handleChange(event, value, reason, `${item}`,  details)
              }
              // options={
              //   Array.isArray(heroDataValues.names)
              //     ? heroDataValues.names.map(name => [name])
              //     : Array.from(heroDataValues.names).map(name => [name])
              // }
              // value={[ ...autocompleteFilters.names ] as any}
              options={
                Array.isArray(heroDataValues[`${item}`])
                  ? [ ...heroDataValues[`${item}`] ].map(name => [name])
                  : Array.from(heroDataValues[`${item}`]).map(name => [name])
              }
              value={[ ...autocompleteFilters[`${item}`] ] as any}
            />
          ))
        }
        <BasicAutocomplete
          disabled={ [ ...heroDataValues.names ].length === 0 }
          id='names'
          label='Names'
          onChange={(event, value, reason, details) =>
            handleChange(event, value, reason, 'names',  details)
          }
          options={
            Array.isArray(heroDataValues.names)
              ? heroDataValues.names.map(name => [name])
              : Array.from(heroDataValues.names).map(name => [name])
          }
          value={[ ...autocompleteFilters.names ] as any}
        />
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
