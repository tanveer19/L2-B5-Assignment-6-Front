import {
  useGetRecentTransactionsQuery,
  useGetWalletQuery,
} from "@/redux/features/user/user.api";
import UserTransactionTable from "./UserTransactionTable";
import UserOverviewCard from "./UserOverViewCard";

export default function UserOverviewPage() {
  const { data: walletRes, isLoading: walletLoading } = useGetWalletQuery();
  const { data: recentTxRes } = useGetRecentTransactionsQuery({ limit: 5 });

  const wallet = walletRes?.data;
  const recent = recentTxRes?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <UserOverviewCard title="Wallet Balance" loading={walletLoading}>
          <div className="text-3xl font-bold">
            {wallet ? `${wallet.balance.toLocaleString()} BDT` : "—"}
          </div>
        </UserOverviewCard>

        <UserOverviewCard title="Quick Actions">
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
        </UserOverviewCard>

        <UserOverviewCard title="Recent Activity">
          <ul className="text-sm space-y-2">
            {recent.length === 0 && (
              <li className="text-muted-foreground">No recent transactions</li>
            )}
            {recent.map((tx) => (
              <li key={tx._id} className="flex justify-between">
                <span>
                  {tx.type} • {tx.narrative ?? tx.to ?? tx.from}
                </span>
                <span className="font-medium">{tx.amount}</span>
              </li>
            ))}
          </ul>
        </UserOverviewCard>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Recent Transactions</h3>
        <UserTransactionTable pageSize={6} />
      </div>
    </div>
  );
}
