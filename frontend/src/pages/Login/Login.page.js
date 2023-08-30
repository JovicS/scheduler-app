import React from "react";
import { useTranslation } from "react-i18next";
import PublicLayout from "../../layouts/Public/Public.layout";
import styles from "./Login.module.css";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import Form from "../../components/Form/Form.components";
import InitLoginLogic, { email, password } from "./Login.logic";
import {
  HidePassword,
  ShowPassword,
} from "../../components/Icons/Icons.components";

const LoginPage = () => {
  const { t } = useTranslation();
  const { methods, onSubmit, showPassword, setShowPassword, message } =
    InitLoginLogic();
  const { register, handleSubmit, formState } = methods;
  const { errors } = formState;

  return (
    <PublicLayout
      child={
        <>
          <Form
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            message={message}>
            <div className={styles.form}>
              <Card className={styles.login_card}>
                <CardContent className={styles.card_content}>
                  <div className={styles.login_title}>
                    {t("Login into Scheduler app") ||
                      console.warn("No translation")}
                  </div>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      {...register(email)}
                      label={
                        t("Email address") || console.warn("No translation")
                      }
                      error={!!errors?.email}
                      helperText={errors?.email ? errors?.email.message : ""}
                    />

                    <TextField
                      fullWidth
                      {...register(password)}
                      label={t("Password") || console.warn("No translation")}
                      error={!!errors?.password}
                      helperText={
                        errors?.password ? errors?.password.message : ""
                      }
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
                  <div className={styles.login_button}>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      style={{ paddingTop: "15px" }}>
                      {t("Login") || console.warn("No translation")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Form>
        </>
      }></PublicLayout>
  );
};

export default LoginPage;
