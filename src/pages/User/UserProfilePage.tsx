import React from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/user.api";

export default function UserProfilePage() {
  const { data } = useGetProfileQuery();
  const profile = data?.data;
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: profile?.name ?? "",
      phone: profile?.phone ?? "",
    },
  });

  React.useEffect(() => {
    reset({ name: profile?.name ?? "", phone: profile?.phone ?? "" });
  }, [profile, reset]);

  const onSubmit = async (vals: any) => {
    try {
      const res = await updateProfile(vals).unwrap();
      toast.success("Profile updated");
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <Input {...register("name")} />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <Input {...register("phone")} />
        </div>
        <div>
          <label className="block text-sm font-medium">New password</label>
          <Input {...register("password")} type="password" />
        </div>
        <div>
          <Button type="submit" disabled={isLoading}>
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}
