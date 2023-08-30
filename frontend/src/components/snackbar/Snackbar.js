import React, { forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../redux/snackbar/snackbarSlice';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const autoHideDuration = 4000;

export default function CustomizedSnackbars() {
  const { t } = useTranslation();
  const snackbar = useSelector((state) => state.snackbar);

  const dispatch = useDispatch()

  const handleClose = (reason) => {
    if (reason !== 'clickaway') {
      dispatch(close());
    }
  };

  return (
    snackbar.alert !== '' && 
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={snackbar.show} autoHideDuration={autoHideDuration} onClose={handleClose} anchorOrigin={{ vertical:'bottom', horizontal:'right' }}>
        <Alert onClose={handleClose} severity={snackbar.alert} sx={{ width: '100%' }}>
          {t(snackbar.text)}
        </Alert>
      </Snackbar>
    </Stack>
  );
}