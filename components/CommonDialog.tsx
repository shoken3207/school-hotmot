import { Dialog, DialogTitle, Slide } from '@mui/material';
import {
  Dispatch,
  ReactElement,
  ReactNode,
  Ref,
  SetStateAction,
  forwardRef,
} from 'react';
import { TransitionProps } from '@mui/material/transitions';

type CommonDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<number | undefined>>;
  dialogTitle?: string;
  isTransition?: boolean;
  children: ReactNode;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function CommonDialog(props: CommonDialogProps) {
  const { isOpen, setIsOpen, dialogTitle, children, isTransition } = props;

  const handleClose = () => {
    setIsOpen(undefined);
  };

  return (
    <>
      {isTransition ? (
        <Dialog
          open={isOpen}
          onClose={handleClose}
          maxWidth='sm'
          TransitionComponent={Transition}
          PaperProps={{ style: { minWidth: 340, width: '80%' } }}
        >
          {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
          {children}
        </Dialog>
      ) : (
        <Dialog
          open={isOpen}
          onClose={handleClose}
          maxWidth='sm'
          PaperProps={{ style: { minWidth: 340 } }}
        >
          {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
          {children}
        </Dialog>
      )}
    </>
  );
}
