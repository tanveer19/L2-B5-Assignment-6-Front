import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import type { TRole } from "@/types";
import { role } from "@/constants/role";
import User from "@/pages/User/User";
import Agent from "@/pages/Agent/Agent";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: withAuth(About),
        path: "about",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  // {
  //   Component: withAuth(DashboardLayout, role.user as TRole),
  //   path: "/user",
  //   children: [
  //     { index: true, element: <Navigate to="/user" /> },
  //     ...generateRoutes(userSidebarItems),
  //   ],
  // },
  {
    Component: User,
    path: "/user",
  },
  {
    Component: Agent,
    path: "/agent",
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },

  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
