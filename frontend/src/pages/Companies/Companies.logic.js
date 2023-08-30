import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tooltip } from "@mui/material";
import data from "../../config/mock3.json";

function InitCompaniesLogic() {
  const [open, setOpen] = useState({ dialog: false, menu: false });
  const { t } = useTranslation();
  const [rows, setRows] = useState(data.company);
  const [rowCountState, setRowCountState] = useState(1);
  const [tableOptions, setTableOptions] = useState({ page: 0, pageSize: 10 });
  const [selectedRow, setSelectedRow] = useState("");
  const id = "id";
  const entity = "/companies";

  // const rowCount = () => count(entity).then((data) => setRowCountState(data));
  const rowCount = () => {
    if (10 / rows.length > 1) {
      setRowCountState(rowCountState);
    } else {
      setRowCountState(rowCountState + 1);
    }
  };
  const fetchCompanies = () => setRows(data.company);
  const title = {
    breadcrumbs: "Companies",
    table: "Companies list",
    add: "",
  };

  const columns = [
    { field: "companyName", headerName: t("Company Name"), width: 250 },
    { field: "companyEmail", headerName: t("Email"), width: 300 },
    { field: "companyPhoneNumber", headerName: t("Phone Number"), width: 250 },
    { field: "address", headerName: t("Address"), width: 300 },
    {
      field: "Trucks",
      headerName: t("Trucks"),
      renderCell: (cellValue) => {
        return (
          <Tooltip title={t("More options") || console.warn("No translation")}>
            <Button
              variant="text"
              onClick={() => {
                setSelectedRow(cellValue.row);
                setOpen({ dialog: true, menu: false });
              }}>
              {cellValue.row.trucks.length}
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  useEffect(() => {
    fetchCompanies();
    rowCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableOptions]);

  return {
    open,
    setOpen,
    columns,
    rows,
    title,
    tableOptions,
    setTableOptions,
    id,
    fetchCompanies,
    rowCount,
    rowCountState,
    selectedRow,
    entity,
  };
}

export default InitCompaniesLogic;
