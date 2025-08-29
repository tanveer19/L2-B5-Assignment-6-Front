import {
  useGetRecentTransactionsQuery,
  useGetWalletQuery,
} from "@/redux/features/user/user.api";
import AgentOverviewCard from "./AgentOverViewCard";
import { Loader2 } from "lucide-react";
import AgentTransactionTable from "./AgentTransactionTable";

export default function AgentOverviewPage() {
  const { data: walletRes, isLoading: walletLoading } = useGetWalletQuery();
  const { data: recentTxRes, isLoading: txLoading } =
    useGetRecentTransactionsQuery({ limit: 5 });

  const wallet = walletRes?.data;
  const recent = recentTxRes?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Top Overview Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Wallet Balance */}
        <AgentOverviewCard title="Wallet Balance" loading={walletLoading}>
          <div className="text-3xl font-bold flex items-center gap-2">
            {walletLoading ? (
              <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
            ) : wallet ? (
              `${wallet.balance.toLocaleString()} BDT`
            ) : (
              "—"
            )}
          </div>
        </AgentOverviewCard>

        {/* Quick Actions */}
        <AgentOverviewCard title="Quick Actions">
          <div className="flex flex-wrap gap-2">
            <a href="/user/send" className="btn">
              Send
            </a>
            <a href="/user/deposit" className="btn-outline">
              Deposit
            </a>
            <a href="/user/withdraw" className="btn-outline">
              Withdraw
            </a>
          </div>
        </AgentOverviewCard>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Recent Transactions</h3>
        <AgentTransactionTable pageSize={6} />
      </div>
    </div>
  );
}
