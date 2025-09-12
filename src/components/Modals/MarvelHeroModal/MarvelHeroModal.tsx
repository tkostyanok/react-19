import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react';

import {
  useMediaQuery, useTheme
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import type { IMarvelHeroesData } from 'src/interfaces';
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

  const [ heroDataValues, setHeroDataValues ] = useState<IMarvelHeroesData>(initialMarvelHero);
  const [ isDataChanged, setIsDataChanged ] = useState(false);

  useEffect(() => {
    if (isNewHero) {
      setHeroDataValues(initialMarvelHero);
    } else if (!isEmptyObject(data)) {
      setHeroDataValues((prevValues: IMarvelHeroesData) => ({
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

    setHeroDataValues((prevValues: IMarvelHeroesData) => ({
      ...prevValues,
      [target.name]: target.value
    }));
    setIsDataChanged(true);
  };

  const handleSubmit = async () => {
    const modifiedValues = isNewHero
      ? { ...heroDataValues }
      : getModificationsFromSimpleObjects(
          data || {}, 
          heroDataValues
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
          data={ heroDataValues }
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
