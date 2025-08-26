import App from "@/App";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter, Navigate } from "react-router";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import User from "@/pages/User/UserDashboardLayout";
import Agent from "@/pages/Agent/Agent";
import UserDashboardLayout from "@/pages/User/UserDashboardLayout";
import UserOverviewPage from "@/pages/User/UserOverviewPage";
import UserSendMoneyPage from "@/pages/User/UserSendMoneyPage";
import UserTransactionTable from "@/pages/User/UserTransactionTable";
import UserProfilePage from "@/pages/User/UserProfilePage";

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
    path: "/user",
    Component: UserDashboardLayout,
    children: [
      { index: true, Component: UserOverviewPage },
      { path: "send", Component: UserSendMoneyPage },
      // { path: "deposit", Component: DepositPage },
      // { path: "withdraw", Component: WithdrawPage },
      { path: "transactions", Component: UserTransactionTable },
      { path: "profile", Component: UserProfilePage },
    ],
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
