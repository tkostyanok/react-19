import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react';

import {
  useMediaQuery, useTheme
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import type { IMarvelHeroTableData } from 'src/interfaces';
import { getModificationsFromSimpleObjects, isEmptyObject } from 'src/utils';
import { initialMarvelHero } from './utils';

import { ModalFooter, ModalHeader } from '../components';
import { MarvelHeroInfo } from './components';

import type { MarvelHeroModalProps } from './MarvelHeroModalProps';

export const MarvelHeroModal = ({
  data,
  isNewHero = false,
  onClose,
  onSave,
  open = false,
}: MarvelHeroModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // TODO: Optimize with add translation
  const title = isNewHero ? 'Add New Hero' : 'Marvel Hero Details';

  const [ heroFilterValues, setHeroFilterValues ] = useState<IMarvelHeroTableData>(initialMarvelHero);
  const [ isDataChanged, setIsDataChanged ] = useState(false);

  useEffect(() => {
    if (isNewHero) {
      setHeroFilterValues(initialMarvelHero);
    } else if (!isEmptyObject(data)) {
      setHeroFilterValues((prevValues: IMarvelHeroTableData) => ({
        ...prevValues,
        ...data
      }));
    }
  }, [ data, isNewHero ]);

  const handleChange = (
    event: SyntheticEvent 
      | ChangeEvent<HTMLInputElement> 
      | (Event & { target: { value: unknown; name: string; }; })
  ) => {
    const target = event.target as HTMLInputElement;

    setHeroFilterValues((prevValues: IMarvelHeroTableData) => ({
      ...prevValues,
      [target.name]: target.value
    }));
    setIsDataChanged(true);
  };

  const handleSubmit = async () => {
    const modifiedValues = isNewHero
      ? { ...heroFilterValues }
      : getModificationsFromSimpleObjects(
          data || {}, 
          heroFilterValues
        );

    // If no changes detected, do not proceed
    if (isEmptyObject(modifiedValues)) {
      onClose();
      return;
    }
    // TODO: Add error handling
    // TODO: new hero , validate required fields
    // TODO: move id generation for new hero to context
    await onSave({
      ...modifiedValues,
      id: data?.id || null
    });
    onClose();
  };

  return (
    <Dialog
      fullScreen={ fullScreen }
      fullWidth
      maxWidth='sm'
      open={ open }
      onClose={ onClose }
    >
      <ModalHeader
        onClose={ onClose }
        title={ title }
      />
      <DialogContent dividers>
        <MarvelHeroInfo
          data={ heroFilterValues }
          onChange={ handleChange }
        />
      </DialogContent>
      <ModalFooter
        isDisabled={ !isDataChanged }
        onClose={ onClose }
        onSubmit={ handleSubmit }
      />
    </Dialog>
  );
};
