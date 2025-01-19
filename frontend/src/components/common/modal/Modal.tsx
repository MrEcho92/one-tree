import { ReactNode } from 'react';
import { Dialog, Box } from '@mui/material';

type ModelProps = {
  content: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
};

export default function Modal({ content, isOpen, closeModal }: ModelProps) {
  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth={'sm'} fullWidth>
      <Box>{content}</Box>
    </Dialog>
  );
}
