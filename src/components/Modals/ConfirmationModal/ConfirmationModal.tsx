
import {
  useMediaQuery, useTheme
} from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

import type { ConfirmationModalProps } from './ConfirmationModalProps';
import { ModalFooter, ModalHeader } from '../components';

export const ConfirmationModal = ({
  message,
  onClose,
  onSubmit,
  open = false,
  title,
}: ConfirmationModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={ fullScreen }
      fullWidth
      maxWidth='sm'
      open={ open }
      onClose={ onClose }
    >
      <ModalHeader
        onClose={onClose}
        title={title}
      />
      <DialogContent dividers>
        <Box
          display='inline'
          textAlign='center'
        >
          <Typography
            component='div'
            fontWeight={500}
            mb={2}
            variant='h5'
          >
            {message}
          </Typography>
        </Box>
      </DialogContent>
      <ModalFooter
        color='error'
        submitButtonText='Delete'
        onClose={ onClose }
        onSubmit={ onSubmit }
      />
    </Dialog>
  );
};
