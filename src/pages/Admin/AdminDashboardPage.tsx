import {
  useGetAdminSummaryQuery,
  useGetAdminActivityQuery,
  IAdminActivity,
  IAdminSummary,
} from "@/redux/features/admin/admin.api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  UserCheck,
  UserCog,
  Activity,
  CreditCard,
  BarChart3,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  isCurrency?: boolean;
}

interface RecentActivityProps {
  activities: IAdminActivity[];
  loading: boolean;
}

interface QuickStatsProps {
  summary: IAdminSummary | undefined;
}

interface ActivityItemProps {
  activity: IAdminActivity;
}

export default function AdminDashboardPage() {
  const { data: summaryData, isLoading: summaryLoading } =
    useGetAdminSummaryQuery();
  const { data: activityData, isLoading: activityLoading } =
    useGetAdminActivityQuery({ limit: 10 });

  if (summaryLoading) {
    return <DashboardSkeleton />;
  }

  const summary = summaryData?.data;
  const activities = activityData?.data || [];

  const stats = [
    {
      title: "Total Users",
      value: summary?.totalUsers || 0,
      description: "Registered users",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Agents",
      value: summary?.totalAgents || 0,
      description: "Active agents",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "Total Admins",
      value: summary?.totalAdmins || 0,
      description: "Admin users",
      icon: UserCog,
      color: "text-purple-600",
    },
    {
      title: "Total Transactions",
      value: summary?.totalTransactions || 0,
      description: "All transactions",
      icon: CreditCard,
      color: "text-orange-600",
    },
    {
      title: "Transaction Volume",
      value: summary?.totalTransactionVolume || 0,
      prefix: "৳",
      description: "Total amount processed",
      icon: BarChart3,
      color: "text-red-600",
      isCurrency: true,
    },
    {
      title: "Active Users",
      value: summary?.activeUsers || 0,
      description: "Currently active",
      icon: Activity,
      color: "text-teal-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={activities} loading={activityLoading} />
        <QuickStats summary={summary} />
      </div>
    </div>
  );
}

// ✅ Fixed StatCard with proper types
function StatCard({
  title,
  value,
  prefix = "",
  description,
  icon: Icon,
  color,
  isCurrency = false,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isCurrency ? "৳" : prefix}
          {value.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

// ✅ Fixed RecentActivity with proper types
function RecentActivity({ activities, loading }: RecentActivityProps) {
  if (loading) {
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
          {activities.map((activity) => (
            <ActivityItem key={activity._id} activity={activity} />
          ))}
          {activities.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No recent activity
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ✅ Fixed QuickStats with proper types
function QuickStats({ summary }: QuickStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Today's Transactions</span>
          <span className="font-semibold">
            {summary?.todayTransactions || 0}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Today's Volume</span>
          <span className="font-semibold">
            ৳{summary?.todayTransactionVolume?.toLocaleString() || 0}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Inactive Users</span>
          <span className="font-semibold">{summary?.inactiveUsers || 0}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// ✅ Fixed ActivityItem with proper types
function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-full ${
            activity.type === "DEPOSIT" || activity.type === "RECEIVE"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {activity.type === "DEPOSIT" || activity.type === "RECEIVE"
            ? "↑"
            : "↓"}
        </div>
        <div>
          <p className="font-medium capitalize">
            {activity.type.toLowerCase()}
          </p>
          <p className="text-sm text-muted-foreground">
            {new Date(activity.timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`font-semibold ${
            activity.type === "DEPOSIT" || activity.type === "RECEIVE"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {activity.type === "DEPOSIT" || activity.type === "RECEIVE"
            ? "+"
            : "-"}
          ৳{activity.amount.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground">{activity.userPhone}</p>
      </div>
    </div>
  );
}

// ✅ Fixed DashboardSkeleton
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
