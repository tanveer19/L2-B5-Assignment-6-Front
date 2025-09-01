import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/user.api";

// ✅ Add interface for form values
interface ProfileFormValues {
  name: string;
  phone: string;
  password?: string;
}

export default function UserProfilePage() {
  const { data } = useGetProfileQuery();
  const profile = data?.data;
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // ✅ Use the interface and include password in default values
  const { register, handleSubmit, reset } = useForm<ProfileFormValues>({
    defaultValues: {
      name: profile?.name ?? "",
      phone: profile?.phone ?? "",
      password: "", // ✅ Add password field
    },
  });

  React.useEffect(() => {
    reset({
      name: profile?.name ?? "",
      phone: profile?.phone ?? "",
      password: "", // ✅ Reset password field too
    });
  }, [profile, reset]);

  const onSubmit = async (vals: ProfileFormValues) => {
    try {
      // ✅ Only send fields that have values (don't send empty password)
      const updateData: Partial<ProfileFormValues> = {
        name: vals.name,
        phone: vals.phone,
      };

      if (vals.password) {
        updateData.password = vals.password;
      }

      const res = await updateProfile(updateData).unwrap();
      toast.success("Profile updated successfully");

      // ✅ Clear password field after successful update
      reset({ ...vals, password: "" });
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
          <label className="block text-sm font-medium">
            New password (leave empty to keep current)
          </label>
          <Input {...register("password")} type="password" />
        </div>
        <div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
