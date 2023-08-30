import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/JWTContext.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function InitSettingsLogic() {
  const { i18n } = useTranslation();
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChangeLng = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  };

  return { handleChangeLng, logout };
}

export default InitSettingsLogic;
