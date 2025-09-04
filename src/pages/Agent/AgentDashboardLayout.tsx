import { ModeToggle } from "@/components/layout/ModeToggler";
import { Button } from "@/components/ui/button";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link, Outlet } from "react-router";

export default function AgentDashboardLayout() {
  // const { data: profileRes, isLoading } = useGetProfileQuery();

  // const profile = profileRes?.data;
  const { data: userInfo, isLoading } = useUserInfoQuery();

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <header className="border-b bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="font-bold">
            <span className="text-xl">Agent Dashboard</span>
          </Link>
          {/* <div className="flex items-center gap-4">
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
          </div> */}
          <div className="flex items-center gap-4">
            <ModeToggle />

            {isLoading ? (
              // Loading state
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="hidden sm:block">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ) : userInfo?.data ? (
              // User is logged in - show info and logout button
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <div className="font-medium text-sm">
                    {userInfo.data.name}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {userInfo.data.phone}
                  </div>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="text-sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              // User is not logged in - show login button
              <Button asChild size="sm" className="text-sm">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-4 gap-6">
          <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow-sm">
            <nav className="flex flex-col gap-2">
              <Link
                to="/agent"
                className="text-sm py-2 px-3 rounded hover:bg-gray-50"
              >
                Overview
              </Link>
              <Link
                to="/agent/cashin"
                className="text-sm py-2 px-3 rounded hover:bg-gray-50"
              >
                Cash In
              </Link>
              <Link
                to="/agent/cashout"
                className="text-sm py-2 px-3 rounded hover:bg-gray-50"
              >
                Cash Out
              </Link>

              <Link
                to="/agent/transactions"
                className="text-sm py-2 px-3 rounded hover:bg-gray-50"
              >
                Transactions
              </Link>
              <Link
                to="/agent/profile"
                className="text-sm py-2 px-3 rounded hover:bg-gray-50"
              >
                Profile
              </Link>
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
