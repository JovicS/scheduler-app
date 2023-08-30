import routes from "../../config/routes";
import { show, close } from "../../redux/drawer/drawerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function InitDashboardLogic() {
  const dispatch = useDispatch();
  const isDrawerClosed = useSelector((state) => state.drawer.closed);
  const isAuto = useSelector((state) => state.drawer.auto);
  const sidebarData = routes?.filter((item) => item.icon);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const switchDrawer = () => {
    isDrawerClosed ? dispatch(show(false)) : dispatch(close(false));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    screenWidth <= 700 && !isDrawerClosed && dispatch(close(true));
    screenWidth > 700 && isAuto && dispatch(show(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth]);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  return {
    sidebarData,
    isDrawerClosed,
    switchDrawer,
  };
}

export default InitDashboardLogic;
