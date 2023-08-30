import React from "react";
import styles from "./Public.module.css";

const PublicLayout = ({ child }) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>{child}</div>
    </div>
  );
};

export default PublicLayout;
