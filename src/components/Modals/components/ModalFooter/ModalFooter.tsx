import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

import type { ModalFooterProps } from './ModalFooterProps';

export const ModalFooter = ({
  isDisabled = false,
  onClose,
  onSubmit,
  submitButtonText = 'Save'
}: ModalFooterProps) => {

  return (
    <DialogActions>
      <Button
        color='primary'
        disabled={ isDisabled }
        onClick={ onSubmit }
        size='small'
        type='submit'
        variant='contained'
      >
        {submitButtonText}
      </Button>
      <Button
        color='error'
        onClick={ onClose }
        size='small'
        variant='text'
      >
        Cancel
      </Button>
    </DialogActions>
  );
};
