import React from "react";
import { DataGrid, deDE } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import styles from "./Table.module.css";
import { Delete } from "../Icons/Icons.components";
import { useTranslation } from "react-i18next";
import BreadcrumbComponent from "../Breadcrumbs/Breadcrumb.components";
import InitTableLogic from "./Table.logic";

export default function TableComponent({ props }) {
  const {
    selectionModel,
    setSelectionModel,
    isEdit,
    setIsEdit,
    openDeleteDialog,
    setOpenDeleteDialog,
  } = InitTableLogic();
  const {
    rows,
    columns,
    title,
    open,
    setOpen,
    DialogForm,
    tableOptions,
    setTableOptions,
    id,
    rowCountState,
    selectedRow,
    entity,
    deleteUser,
  } = props;
  const { t, i18n } = useTranslation();

  const handleClose = () => {
    setOpen({ dialog: false, menu: false });
  };

  const handleViewDetails = () => {
    setIsEdit(true);
    setOpen({ dialog: true, menu: false });
  };

  const handleDelete = () => {
    deleteUser();
    setOpenDeleteDialog(false);
  };

  const DeleteRows = () => (
    <div
      className={styles.delete_button}
      style={{ visibility: selectionModel.length <= 0 ? "hidden" : "visible" }}>
      <Tooltip
        title={
          selectionModel.length === 1
            ? t("Delete selected row")
            : t("Delete selected rows")
        }>
        <IconButton onClick={() => setOpenDeleteDialog(true)}>
          {Delete}
        </IconButton>
      </Tooltip>
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        <BreadcrumbComponent
          className={styles.breadcrumbs}
          title={t(title.breadcrumbs)}
        />
        <div className={styles.title}>
          {t(title.table)}
          <div className={styles.additional_fields}>
            {title.add === "" ? null : (
              <Button
                variant="contained"
                size="small"
                sx={{ ml: "50px", height: "36px" }}
                onClick={() => setOpen({ dialog: true, menu: false })}>
                {t("Add new") || console.warn("No translation")}
              </Button>
            )}
          </div>
        </div>
        <DeleteRows />
        <div className={styles.grid_height}>
          <div className={styles.grid}>
            <DataGrid
              rowCount={rowCountState.count}
              getRowId={(row) => row[`${id}`]}
              rows={rows}
              columns={columns}
              page={tableOptions.page}
              onPageChange={(newPage) =>
                setTableOptions((prev) => ({
                  page: newPage,
                  pageSize: prev.pageSize,
                }))
              }
              pageSize={tableOptions.pageSize}
              onPageSizeChange={(newPageSize) =>
                setTableOptions((prev) => ({
                  page: prev.page,
                  pageSize: newPageSize,
                }))
              }
              rowsPerPageOptions={[5, 10, 20, 50]}
              checkboxSelection={title.add !== ""}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
              disableColumnMenu
              disableSelectionOnClick
              localeText={
                i18n.language === "de"
                  ? deDE.components.MuiDataGrid.defaultProps.localeText
                  : null
              }
            />
          </div>
        </div>
        <Menu
          anchorEl={open.menu}
          open={!!open.menu}
          onClose={() => {
            handleClose();
            setIsEdit(false);
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}>
          <MenuItem
            sx={{ color: "rgba(0, 0, 0, 0.87)" }}
            onClick={handleViewDetails}>
            {t("View Details") || console.warn("No translation")}
          </MenuItem>

          <MenuItem
            sx={{ color: "rgba(237, 63, 63, 0.87)" }}
            onClick={() => {
              setOpenDeleteDialog(true);
              handleClose();
            }}>
            {t("Delete") || console.warn("No transalation")}
          </MenuItem>
        </Menu>
      </div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open.dialog}
        onClose={() => {
          handleClose();
          setIsEdit(false);
        }}
        sx={{ minWidth: "350px" }}>
        <DialogForm
          selectedRow={selectedRow}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          entity={entity}
        />
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setIsEdit(false);
        }}>
        <DialogTitle>
          {t("Are you sure you want to delete this user?")}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteDialog(false);
              setIsEdit(false);
            }}
            variant="contained"
            size="small">
            {t("Cancel")}
          </Button>
          <Button onClick={handleDelete} color="error" size="small">
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
