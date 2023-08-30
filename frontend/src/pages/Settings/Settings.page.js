import React from "react";
import { useTranslation } from "react-i18next";
import DashboardLayout from "../../layouts/Dashboard/Dashboard.layout";
import InitSettingsLogic from "./Settings.logic";
import { Avatar } from "../../components/Icons/Icons.components";
import styles from "../Settings/Settings.module.css";
import { Typography, Stack, Switch, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function SettingsPage() {
  const { handleChangeLng, logout } = InitSettingsLogic();
  const { t } = useTranslation();

  const changeLngButtons = (
    <div>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        style={{ paddingTop: "80px" }}>
        <Typography>English</Typography>
        <Switch
          checked={localStorage.getItem("lng") === "en" ? false : true}
          inputProps={{ "aria-label": "ant design" }}
          onChange={(e) => handleChangeLng(e.target.checked ? "de" : "en")}
        />
        <Typography>German</Typography>
      </Stack>
    </div>
  );
  return (
    <DashboardLayout
      child={
        <div className={styles.container}>
          <div className={styles.avatar}>{Avatar}</div>
          <div className={styles.name}>
            Test Account{" "}
            <Tooltip title={t("Logout")}>
              <LogoutIcon
                style={{ paddingLeft: "30px", cursor: "pointer" }}
                onClick={logout}
              />
            </Tooltip>
          </div>
          {changeLngButtons}
        </div>
      }
    />
  );
}

export default SettingsPage;
