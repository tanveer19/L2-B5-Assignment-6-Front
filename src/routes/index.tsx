import App from "@/App";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import UserDashboardLayout from "@/pages/User/UserDashboardLayout";
import UserOverviewPage from "@/pages/User/UserOverviewPage";
import UserSendMoneyPage from "@/pages/User/UserSendMoneyPage";
import UserTransactionTable from "@/pages/User/UserTransactionTable";
import UserProfilePage from "@/pages/User/UserProfilePage";
import UserDepositPage from "@/pages/User/UserDeposit";
import UserWithdrawPage from "@/pages/User/UserWithdraw";
import AgentDashboardLayout from "@/pages/Agent/AgentDashboardLayout";
import AgentOverviewPage from "@/pages/Agent/AgentOverviewPage";
import AgentCashIn from "@/pages/Agent/AgentCashIn";
import AgentCashOut from "@/pages/Agent/AgentCashOut";
import AgentTransactionTable from "@/pages/Agent/AgentTransactionTable";
import AdminDashboardPage from "@/pages/Admin/AdminDashboardPage";
import AdminDashboardLayout from "@/pages/Admin/AdminDashboardLayout";
import AdminOverviewPage from "@/pages/Admin/AdminOverviewPage";

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
      { path: "deposit", Component: UserDepositPage },
      { path: "withdraw", Component: UserWithdrawPage },
      { path: "transactions", Component: UserTransactionTable },
      { path: "profile", Component: UserProfilePage },
    ],
  },
  {
    path: "/agent",
    Component: AgentDashboardLayout,
    children: [
      { index: true, Component: AgentOverviewPage },
      { path: "cashin", Component: AgentCashIn },
      { path: "cashout", Component: AgentCashOut },
      { path: "transactions", Component: AgentTransactionTable },
      { path: "profile", Component: UserProfilePage },
    ],
  },
  {
    path: "/admin",
    Component: AdminDashboardLayout,
    children: [
      { index: true, Component: AdminOverviewPage },
      //   { path: "cashin", Component: AgentCashIn },
      //   { path: "cashout", Component: AgentCashOut },
      //   { path: "transactions", Component: AgentTransactionTable },
      //   { path: "profile", Component: UserProfilePage },
    ],
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
