import type { SyntheticEvent } from 'react';

import { Dialog, DialogContent, DialogActions, useMediaQuery, useTheme, Button } from '@mui/material';

import { MarvelHeroInfo } from '../../Molecules';
import { DialogHeader } from '../components/DialogHeader';
import type { MarvelHeroModalProps } from './MarvelHeroModalProps';

export const MarvelHeroModal = ({
  data,
  isNewHero = false,
  handleCloseModal,
  open = false,

}: MarvelHeroModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const title = isNewHero ? 'Add New Hero' : 'Marvel Hero Details';
  console.log('modal data', data);

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    console.log(`Change event on ${target.name}: ${target.value}`);
  };

  const handleSubmit = async () => {
    /** TODO: submit data */
    handleCloseModal();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={handleCloseModal}
    >
      <DialogHeader
        handleClose={handleCloseModal}
        title={title}
      />
      <DialogContent
        // sx={{
        //   pt: `8px !important`,
        // }}
      >
        <MarvelHeroInfo data={data} />
      </DialogContent>
      <DialogActions>
        <Button
          color='secondary'
          disabled={false}
          onClick={handleSubmit}
          type='submit'
          variant='contained'
          size='small'
        >
          Save
        </Button>
        <Button
          color='error'
          onClick={handleCloseModal}
          variant='text'
          size='small'
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
