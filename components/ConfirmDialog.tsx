import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import CommonDialog from './CommonDialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

type ConfirmDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<number | undefined>>;
  primaryText: string;
  secondaryText?: string;
  onClick: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
};

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { isOpen, setIsOpen, primaryText, secondaryText, onClick } = props;
  const handleClose = () => {
    setIsOpen(undefined);
  };

  const handleExecute = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    onClick(e);
    handleClose();
  };
  return (
    <CommonDialog
      dialogTitle={primaryText}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <DialogContent>
        <DialogContentText>{secondaryText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={() => handleClose()}>
          いいえ
        </Button>
        <Button color='primary' onClick={(e) => handleExecute(e)} autoFocus>
          はい
        </Button>
      </DialogActions>
    </CommonDialog>
  );
};

export default ConfirmDialog;
