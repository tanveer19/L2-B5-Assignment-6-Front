import { useGetTransactionsQuery } from "@/redux/features/user/user.api";
import { ITransaction } from "@/redux/features/user/user.types";
import { useEffect, useState } from "react";

export default function UserTransactionTable({
  pageSize = 10,
}: {
  pageSize?: number;
}) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(pageSize);
  const [type, setType] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState<string | undefined>(undefined);
  const [toDate, setToDate] = useState<string | undefined>(undefined);

  const { data, isLoading, isFetching } = useGetTransactionsQuery({
    page,
    limit,
    type,
    fromDate,
    toDate,
    search,
  });

  const txs: ITransaction[] = data?.data ?? [];
  const meta = data?.meta ?? { total: 0, page: 1, limit };

  useEffect(() => {
    setPage(1);
  }, [type, search, fromDate, toDate, limit]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between mb-4">
        <div className="flex gap-2">
          <select
            value={type ?? ""}
            onChange={(e) => setType(e.target.value || undefined)}
            className="input"
          >
            <option value="">All types</option>
            <option value="DEPOSIT">Deposit</option>
            <option value="WITHDRAW">Withdraw</option>
            <option value="SEND">Send</option>
            <option value="RECEIVE">Receive</option>
          </select>
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by phone or ID"
          />
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="date"
            className="input"
            onChange={(e) => setFromDate(e.target.value || undefined)}
          />
          <input
            type="date"
            className="input"
            onChange={(e) => setToDate(e.target.value || undefined)}
          />
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="input"
          >
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="py-2">Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Counterparty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isFetching ? (
              <tr>
                <td colSpan={5} className="py-4 text-center">
                  Loading…
                </td>
              </tr>
            ) : txs.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center">
                  No transactions
                </td>
              </tr>
            ) : (
              txs.map((tx) => (
                <tr key={tx._id} className="border-t">
                  <td className="py-2">
                    {new Date(tx.createdAt).toLocaleString()}
                  </td>
                  <td>{tx.type}</td>
                  <td className="font-medium">{tx.amount}</td>
                  <td>{tx.from ?? tx.to ?? "-"}</td>
                  <td>{tx.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing {txs.length} of {meta.total}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>
          <div className="px-3">{page}</div>
          <button
            className="btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={txs.length < limit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
