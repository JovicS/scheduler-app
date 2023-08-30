import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MenuVertical } from '../Icons/Icons.components';

function MenuVerticalComponents({setOpen, cellValue, setSelectedRow}) {
  const {t} = useTranslation();
  return (
    <>
      <Tooltip title={t('More options') || console.warn('No translation')}>
        <IconButton
        variant="contained"
        color="primary"
          onClick={(event) => {
            setSelectedRow(cellValue.row)
            setOpen({dialog: false, menu: event.currentTarget});
          }}
        >
            {MenuVertical}
        </IconButton>
      </Tooltip>
      
    </>
  )
}

export default MenuVerticalComponents