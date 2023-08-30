import React from "react";
import TableComponent from "../../components/Table/Table.components";
import DashboardLayout from "../../layouts/Dashboard/Dashboard.layout";
import InitCompaniesLogic from "./Companies.logic";
import CompaniesForm from "./Form/form.companies";

function CompaniesPage() {
  const {
    open,
    columns,
    rows,
    setOpen,
    title,
    tableOptions,
    setTableOptions,
    id,
    fetchCompanies,
    rowCount,
    rowCountState,
    selectedRow,
    entity,
    deleteUser,
  } = InitCompaniesLogic();

  const DialogForm = (props) => (
    <CompaniesForm
      setOpen={setOpen}
      fetchUsers={fetchCompanies}
      rowCount={rowCount}
      props={props}
    />
  );

  const props = {
    open,
    rows,
    columns,
    setOpen,
    title,
    tableOptions,
    setTableOptions,
    id,
    rowCountState,
    selectedRow,
    entity,
    DialogForm,
    deleteUser,
  };
  return <DashboardLayout child={<TableComponent props={props} />} />;
}

export default CompaniesPage;
