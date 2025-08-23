import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div>
      <h1>Admin layout</h1>
      <Outlet></Outlet>
    </div>
  );
}
