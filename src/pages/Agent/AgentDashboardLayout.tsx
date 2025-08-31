import { ModeToggle } from "@/components/layout/ModeToggler";
import { useGetProfileQuery } from "@/redux/features/user/user.api";
import { Link, Outlet } from "react-router";

export default function AgentDashboardLayout() {
  const { data: profileRes, isLoading } = useGetProfileQuery();

  const profile = profileRes?.data;

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <header className="border-b bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="font-bold">
            <span className="text-xl">Agent Dashboard</span>
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

// new code

// import { ModeToggle } from "@/components/layout/ModeToggler";
// import { useGetProfileQuery } from "@/redux/features/user/user.api";
// import { Link, Outlet } from "react-router";
// import {
//   useGetAgentSummaryQuery,
//   useGetAgentActivityQuery,
// } from "@/redux/features/agent/agent.api";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Badge } from "@/components/ui/badge";

// // Add the interface for activity
// interface AgentActivity {
//   _id: string;
//   type: "CASH_IN" | "CASH_OUT";
//   amount: number;
//   userPhone: string;
//   timestamp: string | Date;
//   status: string;
// }

// // Add the interface for summary
// interface AgentSummary {
//   totalCashIn: number;
//   totalCashOut: number;
//   totalTransactions: number;
//   totalCommission: number;
//   todayCashIn: number;
//   todayCashOut: number;
//   todayTransactions: number;
// }

// export default function AgentDashboardLayout() {
//   const { data: profileRes, isLoading: profileLoading } = useGetProfileQuery();
//   const { data: summaryData, isLoading: summaryLoading } =
//     useGetAgentSummaryQuery();
//   const { data: activityData, isLoading: activityLoading } =
//     useGetAgentActivityQuery({ limit: 10 });

//   const profile = profileRes?.data;
//   const summary = summaryData?.data as AgentSummary | undefined;
//   const activities = (activityData?.data || []) as AgentActivity[];

//   return (
//     <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
//       <header className="border-b bg-white dark:bg-slate-800">
//         <div className="container mx-auto px-4 flex items-center justify-between h-16">
//           <Link to="/" className="font-bold">
//             <span className="text-xl">Agent Dashboard</span>
//           </Link>
//           <div className="flex items-center gap-4">
//             <ModeToggle />
//             {profileLoading ? (
//               <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
//             ) : (
//               <div className="text-sm">
//                 <div className="font-medium">{profile?.name}</div>
//                 <div className="text-muted-foreground text-xs">
//                   {profile?.phone}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-6">
//         <div className="grid md:grid-cols-4 gap-6">
//           <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow-sm">
//             <nav className="flex flex-col gap-2">
//               <Link
//                 to="/agent"
//                 className="text-sm py-2 px-3 rounded hover:bg-gray-50"
//               >
//                 Overview
//               </Link>
//               <Link
//                 to="/agent/cashin"
//                 className="text-sm py-2 px-3 rounded hover:bg-gray-50"
//               >
//                 Cash In
//               </Link>
//               <Link
//                 to="/agent/cashout"
//                 className="text-sm py-2 px-3 rounded hover:bg-gray-50"
//               >
//                 Cash Out
//               </Link>
//               <Link
//                 to="/agent/transactions"
//                 className="text-sm py-2 px-3 rounded hover:bg-gray-50"
//               >
//                 Transactions
//               </Link>
//               <Link
//                 to="/agent/profile"
//                 className="text-sm py-2 px-3 rounded hover:bg-gray-50"
//               >
//                 Profile
//               </Link>
//             </nav>
//           </aside>

//           <section className="md:col-span-3">
//             {/* Dashboard Content */}
//             <div className="space-y-6">
//               {/* Summary Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <SummaryCard
//                   title="Total Cash In"
//                   value={summary?.totalCashIn}
//                   subtitle="Transactions"
//                   icon="💰"
//                 />
//                 <SummaryCard
//                   title="Total Cash Out"
//                   value={summary?.totalCashOut}
//                   subtitle="Transactions"
//                   icon="💸"
//                 />
//                 <SummaryCard
//                   title="Today's Transactions"
//                   value={summary?.todayTransactions}
//                   subtitle="Today"
//                   icon="📊"
//                 />
//                 <SummaryCard
//                   title="Total Commission"
//                   value={summary?.totalCommission}
//                   subtitle="BDT"
//                   icon="🎯"
//                   isCurrency
//                 />
//               </div>

//               {/* Recent Activity */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recent Activity</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {activityLoading ? (
//                     <ActivitySkeleton />
//                   ) : activities.length === 0 ? (
//                     <p className="text-muted-foreground">No recent activity</p>
//                   ) : (
//                     <div className="space-y-3">
//                       {activities.map((activity) => (
//                         <ActivityItem key={activity._id} activity={activity} />
//                       ))}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }

// // Skeleton Components
// function DashboardSkeleton() {
//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[...Array(4)].map((_, i) => (
//           <Card key={i}>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-20" />
//                   <Skeleton className="h-8 w-16" />
//                   <Skeleton className="h-3 w-24" />
//                 </div>
//                 <Skeleton className="h-8 w-8 rounded-full" />
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Card>
//         <CardHeader>
//           <Skeleton className="h-6 w-40" />
//         </CardHeader>
//         <CardContent>
//           <ActivitySkeleton />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// function ActivitySkeleton() {
//   return (
//     <div className="space-y-3">
//       {[...Array(5)].map((_, i) => (
//         <div
//           key={i}
//           className="flex items-center justify-between p-3 border rounded-lg"
//         >
//           <div className="flex items-center space-x-3">
//             <Skeleton className="h-6 w-20" />
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-32" />
//               <Skeleton className="h-3 w-40" />
//             </div>
//           </div>
//           <Skeleton className="h-6 w-16" />
//         </div>
//       ))}
//     </div>
//   );
// }

// // SummaryCard Component with proper types
// interface SummaryCardProps {
//   title: string;
//   value: number | undefined;
//   subtitle: string;
//   icon: string;
//   isCurrency?: boolean;
// }

// function SummaryCard({
//   title,
//   value,
//   subtitle,
//   icon,
//   isCurrency = false,
// }: SummaryCardProps) {
//   const displayValue = value !== undefined ? value : 0;

//   return (
//     <Card>
//       <CardContent className="p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-muted-foreground">{title}</p>
//             <p className="text-2xl font-bold">
//               {isCurrency
//                 ? `৳${displayValue.toLocaleString()}`
//                 : displayValue.toLocaleString()}
//             </p>
//             <p className="text-xs text-muted-foreground">{subtitle}</p>
//           </div>
//           <span className="text-3xl">{icon}</span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// // ActivityItem Component with proper types
// interface ActivityItemProps {
//   activity: AgentActivity;
// }

// function ActivityItem({ activity }: ActivityItemProps) {
//   return (
//     <div className="flex items-center justify-between p-3 border rounded-lg">
//       <div className="flex items-center space-x-3">
//         <Badge variant={activity.type === "CASH_IN" ? "default" : "secondary"}>
//           {activity.type}
//         </Badge>
//         <div>
//           <p className="font-medium">+88{activity.userPhone}</p>
//           <p className="text-sm text-muted-foreground">
//             {new Date(activity.timestamp).toLocaleString()}
//           </p>
//         </div>
//       </div>
//       <p
//         className={`font-bold ${
//           activity.type === "CASH_IN" ? "text-green-600" : "text-red-600"
//         }`}
//       >
//         {activity.type === "CASH_IN" ? "+" : "-"}৳
//         {activity.amount.toLocaleString()}
//       </p>
//     </div>
//   );
// }
