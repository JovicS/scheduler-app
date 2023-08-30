import React from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { IconContext } from "react-icons";
import InitDashboardLogic from "./Dashboard.logic";
import { useTranslation } from "react-i18next";
import { IconButton, Tooltip } from "@mui/material";
import { Sidebar } from "../../components/Icons/Icons.components";

const DashboardLayout = ({ child }) => {
  const { sidebarData, isDrawerClosed, switchDrawer } = InitDashboardLogic();
  const { t } = useTranslation();
  return (
    <>
      {!isDrawerClosed ? (
        <>
          <IconContext.Provider value={{ color: "#9C9C9C" }}>
            <nav className={styles.nav_menu}>
              <ul className={styles.nav_menu_items_up}>
                {sidebarData.map((item, index) => {
                  return (
                    <li key={index} className={styles.nav_text}>
                      <Link to={item.path}>
                        <div className={styles.icon}>{item.icon}</div>
                        <span className={styles.name}>
                          {t(item.title) ||
                            console.warn(`${item.title} has no translation`)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Tooltip title={t("Sidebar")}>
                <IconButton
                  onClick={switchDrawer}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    marginBottom: 0,
                    left: "5px",
                  }}>
                  {Sidebar}
                </IconButton>
              </Tooltip>
            </nav>
          </IconContext.Provider>
        </>
      ) : (
        <div className={styles.button_container}>
          <Tooltip title={t("Sidebar")}>
            <IconButton
              onClick={switchDrawer}
              style={{
                position: "fixed",
                bottom: 0,
                marginBottom: 0,
                left: "5px",
                zIndex: 999,
              }}>
              {Sidebar}
            </IconButton>
          </Tooltip>
        </div>
      )}
      <div
        className={!isDrawerClosed ? styles.child : styles.closed_drawer_child}>
        {child}
      </div>
    </>
  );
};

export default DashboardLayout;
