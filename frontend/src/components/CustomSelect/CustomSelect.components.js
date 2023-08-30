import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
// ----------------------------------------------------------------------

export default function CustomSelect({ name, children, style = null, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          className={style}
          {...field}
          autoComplete="off"
          select
          fullWidth
          SelectProps={{ native: true}}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}