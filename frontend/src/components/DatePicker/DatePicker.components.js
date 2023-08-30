import React from 'react';
import InitDatePickerLogic from './DatePicker.logic';
import { Dialog, IconButton, TextField, Tooltip } from '@mui/material';
import { MONTHS } from './monthsList.calendar';
import styles from "./DatePicker.module.css";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { CalendarPicker } from '@mui/x-date-pickers';
import { useTranslation } from 'react-i18next';

function DatePickerComponent({props}) {
    const { date, handleNextMonth, handlePrevMonth, setDate } = props;
    const {open, setOpen} = InitDatePickerLogic();
    const { t } = useTranslation();

  return (
    <>
        <Tooltip title="Previous">
            <IconButton onClick={handlePrevMonth}>
                <KeyboardArrowLeftIcon />
            </IconButton>
        </Tooltip>

        <TextField 
            helperText={null}  
            value={`${t(MONTHS[date?.month])?.toUpperCase()} ${date?.year}`}  
            variant="standard" 
            color='primary' 
            focused 
            inputProps={{min: 0, className: styles.input_text}}
            InputProps={{
                readOnly: true,
                sx: {color: '#1976d2', fontWeight: 500, fontFamily: 'Roboto', fontSize: '16px'},
                className: styles.input_field
            }}
            onClick={()=>setOpen(true)}
        />

        <Dialog open={open} onClose={()=>setOpen(false)}>
            <CalendarPicker 
                date={new Date(date.year, date.month)} 
                onChange={(newValue)=>setDate({month: newValue.getMonth(), year: newValue.getFullYear()})} 
                views={['year', 'month']} 
            />
        </Dialog>

        <Tooltip title="Next">
            <IconButton onClick={handleNextMonth}>
                <NavigateNextIcon />
            </IconButton>
        </Tooltip>
        
    </>
  )
}

export default DatePickerComponent