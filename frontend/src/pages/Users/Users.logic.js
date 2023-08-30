import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import MenuVerticalComponents from "../../components/MenuVertical/MenuVertical.components";
// import { count } from "../../config/APIrequest";
import { show } from "../../redux/snackbar/snackbarSlice";
// import {
//   deleteOneUser,
//   fetchAllUsers,
// } from "../../components/UserForm/UsersAPI";
//-------------------------------------------------------------------------------------------

function InitAdminUsersLogic() {
  const [open, setOpen] = useState({ dialog: false, menu: false });
  const [tableOptions, setTableOptions] = useState({ page: 0, pageSize: 10 });
  const [rows, setRows] = useState([]);
  const [rowCountState, setRowCountState] = useState(1);
  const [selectedRow, setSelectedRow] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const id = "id";
  const entity = "/users";

  const title = { breadcrumbs: "Users", table: "Users list" };

  // const fetchUsers = () => fetchAllUsers(entity).then((data)=> setRows(data));
  const fetchUsers = () =>
    setRows([
      {
        id: 1,
        firstName: "Test",
        role: "Admin",
        email: "scheduler@test.com",
        surname: "Account",
        phoneNumber: "123456",
      },
    ]);
  // const rowCount = () => count(entity).then((data) => setRowCountState(data));
  const rowCount = () => {
    if (10 / rows.length > 1) {
      setRowCountState(rowCountState);
    } else {
      setRowCountState(rowCountState + 1);
    }
  };

  const deleteUser = async () => {
    setRows([]);
    rowCount();
    dispatch(show({ text: "Successfully deleted", alert: "success" }));
    // try {
    //   const response = await deleteOneUser(entity, selectedRow.id);
    //   if (response.error) {
    //     dispatch(show({ text: "User not found", alert: "success" }));
    //   } else {
    //     fetchUsers();
    //     rowCount();
    //     dispatch(show({ text: "Successfully deleted", alert: "success" }));
    //   }
    // } catch (error) {
    //   console.log(error);
    //   dispatch(show({ text: "User not found", alert: "success" }));
    // }
  };

  useEffect(() => {
    fetchUsers();
    rowCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableOptions]);

  const columns = [
    { field: "id", headerName: t("AdminID"), width: 200 },
    { field: "firstName", headerName: t("Name"), width: 200 },
    {
      field: "role",
      headerName: t("Role"),
      width: 200,
      renderCell: (cellValue) => t(cellValue.row.role),
    },
    { field: "email", headerName: t("Email"), width: 200 },
    {
      field: t("Details"),
      renderCell: (cellValue) => {
        return (
          <MenuVerticalComponents
            setOpen={setOpen}
            cellValue={cellValue}
            setSelectedRow={setSelectedRow}
          />
        );
      },
    },
  ];

  return {
    open,
    setOpen,
    columns,
    rows,
    title,
    tableOptions,
    setTableOptions,
    id,
    fetchUsers,
    rowCount,
    rowCountState,
    selectedRow,
    setRows,
    entity,
    deleteUser,
  };
}

export default InitAdminUsersLogic;
