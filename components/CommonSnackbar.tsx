import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { hide } from '../features/snackbarIsShow/snackbarIsShowSlice';

type TransitionProps = Omit<SlideProps, 'direction'>;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const SlideTransition = (props: TransitionProps) => {
  return <Slide {...props} direction='up' />;
};

const CommonSnackbar = () => {
  const dispatch = useDispatch();
  const snackbarInfo = useSelector((state: RootState) => state.snackbarInfo);
  const snackbarIsShow = useSelector(
    (state: RootState) => state.snackbarIsShow.value
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hide());
  };

  return (
    <Snackbar
      open={snackbarIsShow}
      autoHideDuration={3000}
      onClose={() => handleClose()}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={() => handleClose()}
        sx={{ width: '100%' }}
        severity={snackbarInfo.severity}
      >
        {snackbarInfo.text}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackbar;
