import { ModeToggle } from "@/components/layout/ModeToggler";
import { useGetProfileQuery } from "@/redux/features/user/user.api";
import { Link, Outlet } from "react-router";

export default function AdminDashboardLayout() {
  const { data: profileRes, isLoading } = useGetProfileQuery();

  const profile = profileRes?.data;

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <header className="border-b bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="font-bold">
            <span className="text-xl">Admin Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <ModeToggle />
            {isLoading ? (
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
            ) : (
              <div className="text-sm">
                <div className="font-medium">{profile?.name}</div>
                <div className="text-muted-foreground text-xs">
                  {profile?.phone}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-4 gap-6">
          <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow-sm">
            <nav className="flex flex-col gap-2">
              <Link
                to="/admin"
                className="text-sm py-2 px-3 rounded hover:bg-gray-50"
              >
                Overview
              </Link>
              <Link
                to="/admin/users"
                className="text-sm py-2 px-3 rounded hover:bg-gray-50"
              >
                Manage Users
              </Link>
              <Link
                to="/admin/agents"
                className="text-sm py-2 px-3 rounded hover:bg-gray-50"
              >
                Manage Agents
              </Link>
              {/* <Link
                to="/admin/transactions"
                className="text-sm py-2 px-3 rounded hover:bg-gray-50"
              >
                All Transactions
              </Link>

              <Link
                to="/admin/profile"
                className="text-sm py-2 px-3 rounded hover:bg-gray-50"
              >
                Profile
              </Link> */}
            </nav>
          </aside>

          <section className="md:col-span-3">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
}
