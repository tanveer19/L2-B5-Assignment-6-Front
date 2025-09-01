import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetAdminSummaryQuery,
  useGetAdminActivityQuery,
} from "@/redux/features/admin/admin.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";
import {
  Users,
  UserCheck,
  UserCog,
  Activity,
  CreditCard,
  BarChart3,
  ArrowUp,
  ArrowDown,
  History,
} from "lucide-react";

// Add the interface for activity
interface AdminActivity {
  _id: string;
  type: string;
  amount: number;
  userPhone: string;
  timestamp: Date;
  status: string;
}

// Add the interface for summary
interface AdminSummary {
  totalUsers: number;
  totalAgents: number;
  totalAdmins: number;
  totalTransactions: number;
  totalTransactionVolume: number;
  todayTransactions: number;
  todayTransactionVolume: number;
  activeUsers: number;
  inactiveUsers: number;
}

export default function AdminOverviewPage() {
  const { data: summaryData, isLoading: summaryLoading } =
    useGetAdminSummaryQuery();
  const { data: activityData, isLoading: activityLoading } =
    useGetAdminActivityQuery({ limit: 10 });

  if (summaryLoading) {
    return <DashboardSkeleton />;
  }

  const summary = summaryData?.data as AdminSummary | undefined;
  const activities = (activityData?.data || []) as AdminActivity[];

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

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity */}
      <RecentActivity activities={activities} loading={activityLoading} />
    </div>
  );
}

// StatCard Component with proper types
interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  isCurrency?: boolean;
}

function StatCard({
  title,
  value,
  prefix = "",
  description,
  icon: Icon,
  color,
  isCurrency = false,
}: StatCardProps) {
  const displayValue = value !== undefined ? value : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isCurrency
            ? `৳${displayValue.toLocaleString()}`
            : `${prefix}${displayValue.toLocaleString()}`}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

// QuickActions Component
function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <Link
          to="/admin/users"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <Users className="h-4 w-4" />
          Manage Users
        </Link>
        <Link
          to="/admin/agents"
          className="inline-flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <UserCheck className="h-4 w-4" />
          Manage Agents
        </Link>
        <Link
          to="/admin/transactions"
          className="inline-flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <History className="h-4 w-4" />
          View All Transactions
        </Link>
      </CardContent>
    </Card>
  );
}

// RecentActivity Component with proper types
interface RecentActivityProps {
  activities: AdminActivity[];
  loading: boolean;
}

function RecentActivity({ activities, loading }: RecentActivityProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivitySkeleton />
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
          {activities.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No recent activity
            </p>
          ) : (
            activities.map((activity) => (
              <ActivityItem key={activity._id} activity={activity} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ActivityItem Component with proper types
interface ActivityItemProps {
  activity: AdminActivity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center space-x-3">
        <div
          className={`p-2 rounded-full ${
            activity.type === "DEPOSIT" || activity.type === "RECEIVE"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {activity.type === "DEPOSIT" || activity.type === "RECEIVE" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
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

// Skeleton Components
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <ActivitySkeleton />
        </CardContent>
      </Card>
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 border rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      ))}
    </div>
  );
}
