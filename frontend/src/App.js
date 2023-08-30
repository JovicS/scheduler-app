import { useContext } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CustomizedSnackbars from "./components/snackbar/Snackbar";
import routes from "./config/routes";
import { AuthContext } from "./context/JWTContext.context";
import LoginPage from "./pages/Login/Login.page";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import deLocale from "date-fns/locale/de";
import enLocale from "date-fns/locale/en-US";
import { useTranslation } from "react-i18next";

function App() {
  const stored = useContext(AuthContext);
  const { i18n } = useTranslation();
  const localeMap = {
    en: enLocale,
    de: deLocale,
  };
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={localeMap[i18n.language]}>
      <BrowserRouter>
        <Routes>
          {!stored.isAuthenticated ? (
            <Route path={"*"} element={<LoginPage />} />
          ) : (
            routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component {...route?.props} />}
              />
            ))
          )}
        </Routes>
      </BrowserRouter>
      <CustomizedSnackbars />
    </LocalizationProvider>
  );
}

export default App;
