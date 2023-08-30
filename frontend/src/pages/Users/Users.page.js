import React from "react";
import TableComponent from "../../components/Table/Table.components";
import UserForm from "./UserForm/form.users";
import DashboardLayout from "../../layouts/Dashboard/Dashboard.layout";
import InitAdminUsersLogic from "./Users.logic";

function AdminUsersPage() {
  const {
    open,
    columns,
    rows,
    setOpen,
    title,
    tableOptions,
    setTableOptions,
    id,
    fetchUsers,
    rowCount,
    rowCountState,
    selectedRow,
    entity,
    setRows,
    deleteUser,
  } = InitAdminUsersLogic();

  const DialogForm = (props) => (
    <UserForm
      setOpen={setOpen}
      fetchUsers={fetchUsers}
      rowCount={rowCount}
      props={props}
      rows={rows}
      setRows={setRows}
    />
  );

  const props = {
    open,
    rows,
    columns,
    setOpen,
    title,
    DialogForm,
    tableOptions,
    setTableOptions,
    id,
    rowCountState,
    selectedRow,
    entity,
    deleteUser,
  };
  return <DashboardLayout child={<TableComponent props={props} />} />;
}

export default AdminUsersPage;
