import {
  BuildingIcon,
  CalendarIcon,
  ManagersIcon,
  Settings,
} from "../components/Icons/Icons.components";
import CalendarPage from "../pages/Calendar/Calendar.page";
import CompaniesPage from "../pages/Companies/Companies.page";
import ErrorPage from "../pages/Error/error.page";
import LoginPage from "../pages/Login/Login.page";
import AdminUsersPage from "../pages/Users/Users.page";
import SettingsPage from "../pages/Settings/Settings.page";

const routes = [
  {
    path: "/",
    component: CalendarPage,
    icon: CalendarIcon,
    title: "Calendar",
  },
  {
    path: "/companies",
    component: CompaniesPage,
    icon: BuildingIcon,
    title: "Companies",
  },
  {
    path: "/users",
    component: AdminUsersPage,
    icon: ManagersIcon,
    title: "Users",
  },
  {
    path: "/settings",
    component: SettingsPage,
    icon: Settings,
    title: "Settings",
  },
  {
    path: "/login",
    component: LoginPage,
    allowedRoles: ["USER"],
  },
  {
    path: "*",
    component: ErrorPage,
    props: { message: "not found", error: 404 },
  },
];

export default routes;
