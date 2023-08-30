import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../config/APIrequest";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/JWTContext.context";
import { useDispatch } from "react-redux";
import { show } from "../../redux/snackbar/snackbarSlice";
//-------------------------------------------------------------

const LoginFormFields = {
  email: "email",
  password: "password",
};

export const { email, password } = LoginFormFields;

const InitLoginLogic = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const fieldIsRequired =
    t("This field is required") || console.warn("No translation");
  const { setIsAuthenticated } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(fieldIsRequired).nullable(),
    password: Yup.string().required(fieldIsRequired).nullable(),
  });

  const defaultValues = {
    [email]: "scheduler@test.com",
    [password]: "123456",
  };

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { setError, handleSubmit } = methods;

  const onSubmit = async (data) => {
    if (
      data.email === defaultValues.email &&
      data.password === defaultValues.password
    ) {
      localStorage.setItem("token", "token123");
      localStorage.setItem("lng", navigator.language === "de" ? "de" : "en");
      i18n.changeLanguage(navigator.language === "de" ? "de" : "en");
      setIsAuthenticated(true);
      navigate("/", { replace: true });
    } else {
      dispatch(show({ text: "Invalid credentials!", alert: "error" }));
    }
    // try {
    //     const response =  await login('/login',data);
    //     if(response?.error){
    //         dispatch(show({text:response.error.message, alert: 'error'}));
    //     }else{
    //         localStorage.setItem('token', response?.token)
    //         localStorage.setItem('lng', navigator.language==='de'? 'de' : 'en')
    //         i18n.changeLanguage(navigator.language==='de'? 'de' : 'en');
    //         setIsAuthenticated(true)
    //         navigate('/', { replace: true })
    //     }
    // } catch (error) {
    //     setError('afterSubmit', {
    //         ...error,
    //         message: error.message,
    //     });
    // }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    showPassword,
    setShowPassword,
  };
};

export default InitLoginLogic;
