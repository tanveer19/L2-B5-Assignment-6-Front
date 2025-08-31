// import { useGetTransactionsQuery } from "@/redux/features/user/user.api";
// import { ITransaction } from "@/redux/features/user/user.types";
// import { useEffect, useState } from "react";

// export default function AgentTransactionTable({
//   pageSize = 10,
// }: {
//   pageSize?: number;
// }) {
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(pageSize);
//   const [type, setType] = useState<string | undefined>(undefined);
//   const [search, setSearch] = useState("");
//   const [fromDate, setFromDate] = useState<string | undefined>(undefined);
//   const [toDate, setToDate] = useState<string | undefined>(undefined);

//   const { data, isLoading, isFetching } = useGetTransactionsQuery({
//     page,
//     limit,
//     type,
//     fromDate,
//     toDate,
//     search,
//   });

//   const txs: ITransaction[] = data?.data?.data ?? [];
//   const meta = data?.data?.meta ?? { total: 0, page: 1, limit };

//   useEffect(() => {
//     setPage(1);
//   }, [type, search, fromDate, toDate, limit]);

//   return (
//     <div>
//       <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between mb-4">
//         <div className="flex gap-2">
//           <select
//             value={type ?? ""}
//             onChange={(e) => setType(e.target.value || undefined)}
//             className="input"
//           >
//             <option value="">All types</option>
//             <option value="DEPOSIT">Deposit</option>
//             <option value="WITHDRAW">Withdraw</option>
//             <option value="SEND">Send</option>
//             <option value="RECEIVE">Receive</option>
//           </select>
//           <input
//             className="input"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search by phone or ID"
//           />
//         </div>
//         <div className="flex gap-2 items-center">
//           <input
//             type="date"
//             className="input"
//             onChange={(e) => setFromDate(e.target.value || undefined)}
//           />
//           <input
//             type="date"
//             className="input"
//             onChange={(e) => setToDate(e.target.value || undefined)}
//           />
//           <select
//             value={limit}
//             onChange={(e) => setLimit(Number(e.target.value))}
//             className="input"
//           >
//             <option value={6}>6</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//           </select>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="text-left">
//               <th className="py-2">Date</th>
//               <th>Type</th>
//               <th>Amount</th>
//               <th>Counterparty</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading || isFetching ? (
//               <tr>
//                 <td colSpan={5} className="py-4 text-center">
//                   Loading…
//                 </td>
//               </tr>
//             ) : txs.length === 0 ? (
//               <tr>
//                 <td colSpan={5} className="py-4 text-center">
//                   No transactions
//                 </td>
//               </tr>
//             ) : (
//               txs.map((tx) => (
//                 <tr key={tx._id} className="border-t">
//                   <td className="py-2">
//                     {new Date(tx.createdAt).toLocaleString()}
//                   </td>
//                   <td>{tx.type}</td>
//                   <td className="font-medium">{tx.amount}</td>
//                   <td>
//                     {typeof tx.from === "object"
//                       ? tx.from.phone
//                       : typeof tx.to === "object"
//                       ? tx.to.phone
//                       : "-"}
//                   </td>

//                   <td>{tx.status}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between mt-4">
//         <div className="text-sm text-muted-foreground">
//           Showing {txs.length} of {meta.total}
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             className="btn"
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page <= 1}
//           >
//             Prev
//           </button>
//           <div className="px-3">{page}</div>
//           <button
//             className="btn"
//             onClick={() => setPage((p) => p + 1)}
//             disabled={txs.length < limit}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download } from "lucide-react";

export default function AgentTransactions() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    type: "",
    search: "",
    fromDate: "",
    toDate: "",
  });

  const { data: transactions, isLoading } =
    useGetAgentTransactionsQuery(filters);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Input
              placeholder="Search by phone..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="max-w-sm"
            />
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="border rounded-md px-3 py-2"
            >
              <option value="">All Types</option>
              <option value="DEPOSIT">Cash In</option>
              <option value="WITHDRAW">Cash Out</option>
            </select>
            <Input
              type="date"
              placeholder="From Date"
              value={filters.fromDate}
              onChange={(e) =>
                setFilters({ ...filters, fromDate: e.target.value })
              }
            />
            <Input
              type="date"
              placeholder="To Date"
              value={filters.toDate}
              onChange={(e) =>
                setFilters({ ...filters, toDate: e.target.value })
              }
            />
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Transactions Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.data?.data?.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.type === "DEPOSIT" ? "default" : "secondary"
                      }
                    >
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>৳{transaction.amount}</TableCell>
                  <TableCell>{transaction.toPhone}</TableCell>
                  <TableCell>
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="success">Completed</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {transactions?.data?.meta && (
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {transactions.data.data.length} of{" "}
                {transactions.data.meta.total} transactions
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={filters.page === 1}
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page - 1 })
                  }
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={
                    filters.page * filters.limit >= transactions.data.meta.total
                  }
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page + 1 })
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
