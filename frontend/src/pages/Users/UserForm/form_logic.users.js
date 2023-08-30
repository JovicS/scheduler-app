import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { show } from "../../../redux/snackbar/snackbarSlice";
import { createUser, editUser } from "./UsersAPI";
//--------------------------------------------------------------

export const ROLES = ["driver", "admin", "manager"];

const UserFormFields = {
  firstName: "firstName",
  surname: "surname",
  phoneNumber: "phoneNumber",
  email: "email",
  password: "password",
  language: "language",
  role: "role",
  company: "company",
};

export const {
  firstName,
  surname,
  phoneNumber,
  email,
  password,
  language,
  role,
  company,
} = UserFormFields;

function InitUserFormLogic({
  setOpen,
  fetchUsers,
  rowCount,
  props,
  rows,
  setRows,
}) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const fieldIsRequired =
    t("This field is required") || console.warn("No translation");

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(fieldIsRequired).nullable(),
    firstName: Yup.string().required(fieldIsRequired).nullable(),
    phoneNumber: Yup.string().required(fieldIsRequired).nullable(),
    surname: Yup.string().required(fieldIsRequired).nullable(),
    password: !props.isEdit
      ? Yup.string().required(fieldIsRequired).nullable()
      : Yup.string().nullable(),
  });

  const defaultValues = {
    [email]: props.isEdit ? props?.selectedRow.email : "",
    [password]: "",
    [firstName]: props.isEdit ? props?.selectedRow.firstName : "",
    [surname]: props.isEdit ? props?.selectedRow.surname : "",
    [phoneNumber]: props.isEdit ? props?.selectedRow.phoneNumber : "",
    [language]: "en",
    [role]: props.isEdit ? props?.selectedRow.role : ROLES[0],
    [company]: props.isEdit ? props?.selectedRow.company : "",
  };

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { setError, handleSubmit } = methods;

  const onSubmit = async (data) => {
    // const dataCopy = { ...data, id: 2 };
    // if (dataCopy.password === "" && props?.isEdit) {
    //   delete dataCopy.password;
    // }
    try {
      dispatch(
        show({
          text: !props?.isEdit ? "Successfully added" : "Successfully edited",
          alert: "success",
        })
      );
      setOpen({ dialog: false, menu: false });
      if (props.isEdit) {
        props.setIsEdit(false);
      }
    } catch (error) {
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
      dispatch(show({ text: error.message, alert: "error" }));
    }
    // try {
    //   const response = !props?.isEdit
    //     ? await createUser(props?.entity, dataCopy)
    //     : await editUser(props?.entity, props?.selectedRow.id, dataCopy);
    //   if (response?.ok === false) {
    //     dispatch(show({ text: "Email is already used", alert: "error" }));
    //   } else {
    //     dispatch(
    //       show({
    //         text: !props?.isEdit ? "Successfully added" : "Successfully edited",
    //         alert: "success",
    //       })
    //     );
    //     setOpen({ dialog: false, menu: false });
    //     if (props.isEdit) {
    //       props.setIsEdit(false);
    //     }
    //     fetchUsers();
    //     rowCount();
    //   }
    // } catch (error) {
    //   setError("afterSubmit", {
    //     ...error,
    //     message: error.message,
    //   });
    //   dispatch(show({ text: error.message, alert: "error" }));
    // }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    showPassword,
    setShowPassword,
  };
}

export default InitUserFormLogic;
