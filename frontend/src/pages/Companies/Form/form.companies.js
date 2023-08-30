import React from "react";
import { Card, List, ListItem, ListItemText } from "@mui/material";
import InitTrucksFormLogic from "./form_logic.companies";
import styles from "./form.companies.module.css";
//-----------------------------------------------------------------------------------------------------------------------------------

const CompaniesForm = ({ props }) => {
  const { defaultValues } = InitTrucksFormLogic(props);

  return (
    <Card sx={{ p: 3 }}>
      <div className={styles.title}>{defaultValues.company}</div>
      <List className={styles.list}>
        {defaultValues.truckData?.map((truck, key) => {
          return (
            <ListItem key={key}>
              <ListItemText
                primary={truck.truckName}
                secondary={`size: ${truck.size}m³`}
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default CompaniesForm;
