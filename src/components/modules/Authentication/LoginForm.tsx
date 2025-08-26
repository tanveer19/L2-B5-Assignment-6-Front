import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useLoginMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { TRole } from "@/types";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

type LoginFormValues = {
  phone: string;
  password: string;
};

type IUserInfo = {
  role: TRole;
  phone: string;
  name: string;
};
export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>();

  const [login] = useLoginMutation();

  const { data, refetch, isLoading, isError } = useUserInfoQuery();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        toast.success("Logged in successfully");

        // refetch user info from server (cookie auth)
        const userRes = await refetch().unwrap();
        const user: IUserInfo = userRes.data as IUserInfo;
        dispatch(setUser(res.data));
        // redirect based on role
        if (userRes?.data?.role === "ADMIN") {
          console.log("Redirecting to /admin");
          navigate("/admin");
        } else if (userRes?.data?.role === "AGENT") {
          console.log("Redirecting to /agent");
          navigate("/agent");
        } else {
          console.log("Redirecting to /user");
          navigate("/user");
        }
      }
    } catch (err: any) {
      console.error(err);

      if (err?.data?.message === "Password does not match") {
        toast.error("Invalid credentials");
      }
      if (err?.data?.message === "User is not verified") {
        toast.error("Your account is not verified");
        navigate("/verify", { state: data.phone });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your phone below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="01xxxxxxxxx"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
