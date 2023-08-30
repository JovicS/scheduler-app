import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import Form from "../../../components/Form/Form.components";
import InitUserFormLogic, {
  firstName,
  surname,
  phoneNumber,
  email,
  password,
  language,
  role,
  company,
  ROLES,
} from "./form_logic.users";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.components";
import {
  HidePassword,
  ShowPassword,
} from "../../../components/Icons/Icons.components";
import styles from "./form.users.module.css";
//-----------------------------------------------------------------------------------------------------------------------------------

const UserForm = ({ setOpen, fetchUsers, rowCount, props, rows, setRows }) => {
  const { t } = useTranslation();
  const { methods, onSubmit, showPassword, setShowPassword } =
    InitUserFormLogic({ setOpen, fetchUsers, rowCount, props, rows, setRows });
  const { register, handleSubmit, formState } = methods;
  const { errors } = formState;

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <div className={styles.title}>{t("Add new User")}</div>
        <Stack spacing={2} direction="row" sx={{ pb: 2 }}>
          <TextField
            fullWidth
            {...register(firstName)}
            label={t("First Name") || console.warn("No translation")}
            error={!!errors?.firstName}
            helperText={errors?.firstName ? errors?.firstName.message : ""}
          />
          <TextField
            fullWidth
            {...register(surname)}
            label={t("Surname") || console.warn("No translation")}
            error={!!errors?.surname}
            helperText={errors?.surname ? errors?.surname.message : ""}
          />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 2 }}>
          <TextField
            fullWidth
            {...register(phoneNumber)}
            label={t("Phone Number") || console.warn("No translation")}
            error={!!errors?.phoneNumber}
            helperText={errors?.phoneNumber ? errors?.phoneNumber.message : ""}
          />
          <TextField
            fullWidth
            {...register(email)}
            label={t("Email") || console.warn("No translation")}
            autoComplete="off"
            error={!!errors?.email}
            helperText={errors?.email ? errors?.email.message : ""}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <CustomSelect fullWidth name={role} label={"Role"}>
            {ROLES?.map((role) => (
              <option key={role} value={role}>
                {t(role)}
              </option>
            ))}
          </CustomSelect>
          <TextField
            fullWidth
            {...register(password)}
            label={t("Password") || console.warn("No translation")}
            autoComplete="off"
            error={!!errors?.password}
            helperText={errors?.password ? errors?.password.message : ""}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end">
                    {showPassword ? ShowPassword : HidePassword}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack direction="row" spacing={2} className={styles.action_buttons}>
          <Button
            onClick={() => {
              setOpen({ dialog: false, menu: false });
              props.setIsEdit(false);
            }}>
            {t("Cancel") || console.warn("No translation")}
          </Button>
          {!props?.isEdit && (
            <Button variant="contained" type="submit">
              {t("Save") || console.warn("No translation")}
            </Button>
          )}
        </Stack>
      </Card>
    </Form>
  );
};

export default UserForm;
