import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useGetAllAgentsQuery,
  useUpdateAgentStatusMutation,
} from "@/redux/features/admin/admin.api";

type Status = "ACTIVE" | "BLOCKED";

export default function ManageAgents() {
  const { data, isLoading, isError } = useGetAllAgentsQuery(undefined);
  const [updateUserStatus] = useUpdateAgentStatusMutation();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [usersList, setUsersList] = useState<any[]>([]);

  useEffect(() => {
    const list =
      data?.data?.filter(
        (u: any) => u.role === "agent" || u.role === "AGENT"
      ) ?? [];
    setUsersList(list);
  }, [data]);

  if (isLoading) return <p className="text-center p-4">Loading agents...</p>;
  if (isError)
    return (
      <p className="text-center p-4 text-red-500">Failed to load agents</p>
    );

  const handleToggleStatus = async (user: any) => {
    setLoadingId(user._id);

    const previousStatus = user.isActive as Status;
    const newStatus = (
      previousStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE"
    ) as Status;

    const payload: { userId: string; isActive: boolean } = {
      userId: String(user._id), // Change 'id' to 'userId'
      isActive: newStatus === "ACTIVE", // Convert to boolean if needed
    };
    // optimistic UI update
    setUsersList((prev) =>
      prev.map((u) => (u._id === user._id ? { ...u, isActive: newStatus } : u))
    );

    try {
      console.log("sending payload", payload);
      const res = await updateUserStatus(payload).unwrap();
      console.log("mutation response", res);

      // ... rest of your code
    } catch (error) {
      // ... error handling
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="grid gap-4">
        {usersList.map((user: any) => (
          <Card key={user._id} className="rounded-2xl shadow-md">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
                <p className="text-xs text-gray-400">Role: {user.role}</p>
                <p
                  className={`text-xs font-medium ${
                    user.isActive === "ACTIVE"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {user.isActive}
                </p>
              </div>

              <Button
                variant={user.isActive === "ACTIVE" ? "destructive" : "default"}
                onClick={() => handleToggleStatus(user)}
                disabled={loadingId === user._id}
              >
                {loadingId === user._id ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : user.isActive === "ACTIVE" ? (
                  "Block"
                ) : (
                  "Unblock"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
