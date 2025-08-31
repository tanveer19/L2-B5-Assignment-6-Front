// import {
//   useGetRecentTransactionsQuery,
//   useGetWalletQuery,
// } from "@/redux/features/user/user.api";
// import AgentOverviewCard from "./AgentOverViewCard";
// import { Loader2 } from "lucide-react";
// import AgentTransactionTable from "./AgentTransactionTable";

// export default function AgentOverviewPage() {
//   const { data: walletRes, isLoading: walletLoading } = useGetWalletQuery();
//   const { data: recentTxRes, isLoading: txLoading } =
//     useGetRecentTransactionsQuery({ limit: 5 });

//   const wallet = walletRes?.data;
//   const recent = recentTxRes?.data ?? [];

//   return (
//     <div className="space-y-6">
//       {/* Top Overview Cards */}
//       <div className="grid md:grid-cols-3 gap-4">
//         {/* Wallet Balance */}
//         <AgentOverviewCard title="Wallet Balance" loading={walletLoading}>
//           <div className="text-3xl font-bold flex items-center gap-2">
//             {walletLoading ? (
//               <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
//             ) : wallet ? (
//               `${wallet.balance.toLocaleString()} BDT`
//             ) : (
//               "—"
//             )}
//           </div>
//         </AgentOverviewCard>

//         {/* Quick Actions */}
//         <AgentOverviewCard title="Quick Actions">
//           <div className="flex flex-wrap gap-2">
//             <a href="/user/send" className="btn">
//               Send
//             </a>
//             <a href="/user/deposit" className="btn-outline">
//               Deposit
//             </a>
//             <a href="/user/withdraw" className="btn-outline">
//               Withdraw
//             </a>
//           </div>
//         </AgentOverviewCard>
//       </div>

//       {/* Transactions Table */}
//       <div className="bg-white p-4 rounded-lg shadow-sm">
//         <h3 className="font-semibold mb-4">Recent Transactions</h3>
//         <AgentTransactionTable pageSize={6} />
//       </div>
//     </div>
//   );
// }
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAgentSummaryQuery } from "@/redux/features/agent/agent.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";
import { ArrowUp, ArrowDown, Activity, History } from "lucide-react";

export default function AgentOverview() {
  const { data: summary, isLoading } = useGetAgentSummaryQuery();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const stats = [
    {
      title: "Total Cash In",
      value: summary?.data?.totalCashIn || 0,
      prefix: "৳",
      description: "All time cash in",
      icon: ArrowUp,
      color: "text-green-600",
    },
    {
      title: "Total Cash Out",
      value: summary?.data?.totalCashOut || 0,
      prefix: "৳",
      description: "All time cash out",
      icon: ArrowDown,
      color: "text-red-600",
    },
    {
      title: "Today's Cash In",
      value: summary?.data?.todayCashIn || 0,
      prefix: "৳",
      description: "Today's transactions",
      icon: Activity,
      color: "text-blue-600",
    },
    {
      title: "Total Transactions",
      value: summary?.data?.totalTransactions || 0,
      description: "All handled transactions",
      icon: History,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}

const StatCard = ({
  title,
  value,
  prefix = "",
  description,
  icon: Icon,
  color,
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {prefix}
        {value.toLocaleString()}
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const QuickActions = () => (
  <Card>
    <CardHeader>
      <CardTitle>Quick Actions</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-wrap gap-4">
      <Link
        to="/agent/cashin"
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        <ArrowUp className="h-4 w-4" />
        Cash In
      </Link>
      <Link
        to="/agent/cashout"
        className="inline-flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground"
      >
        <ArrowDown className="h-4 w-4" />
        Cash Out
      </Link>
      <Link
        to="/agent/transactions"
        className="inline-flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground"
      >
        <History className="h-4 w-4" />
        View All Transactions
      </Link>
    </CardContent>
  </Card>
);

const RecentActivity = () => {
  const { data: transactions, isLoading } = useGetAgentTransactionsQuery({
    limit: 5,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions?.data?.data?.slice(0, 5).map((transaction) => (
            <div
              key={transaction._id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === "DEPOSIT"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {transaction.type === "DEPOSIT" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium capitalize">
                    {transaction.type.toLowerCase()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transaction.type === "DEPOSIT"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "DEPOSIT" ? "+" : "-"}৳
                  {transaction.amount}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.toPhone}
                </p>
              </div>
            </div>
          ))}
        </div>

        {transactions?.data?.data?.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No recent transactions
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="space-y-0 pb-2">
            <Skeleton className="h-4 w-20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 mb-1" />
            <Skeleton className="h-3 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-64 w-full" />
  </div>
);
