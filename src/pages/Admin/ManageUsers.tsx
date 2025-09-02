import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
} from "@/redux/features/user/user.api";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function ManageUsers() {
  const { data, isLoading, isError } = useGetAllUsersQuery(undefined);
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (isLoading) return <p className="text-center p-4">Loading users...</p>;
  if (isError)
    return <p className="text-center p-4 text-red-500">Failed to load users</p>;

  const handleToggleStatus = async (user: any) => {
    setLoadingId(user._id);
    try {
      await updateUserStatus({
        id: user._id,
        isActive: user.isActive === "ACTIVE" ? "BLOCKED" : "ACTIVE",
      }).unwrap();
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="grid gap-4">
        {data?.data?.map((user: any) => (
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
