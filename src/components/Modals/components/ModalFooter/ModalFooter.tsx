import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

import type { ModalFooterProps } from './ModalFooterProps';

export const ModalFooter = ({
  isDisabled = false,
  onClose,
  onSubmit
}: ModalFooterProps) => {

  return (
    <DialogActions>
      <Button
        color='primary'
        disabled={ isDisabled }
        onClick={ onSubmit }
        type='submit'
        variant='contained'
        size='small'
      >
        Save
      </Button>
      <Button
        color='error'
        onClick={ onClose }
        variant='text'
        size='small'
      >
        Cancel
      </Button>
    </DialogActions>
  );
};
