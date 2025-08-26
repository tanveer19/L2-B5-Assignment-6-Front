import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendMoneyMutation } from "@/redux/features/user/user.api";

type FormValues = { to: string; amount: number; narrative?: string };

export default function UserSendMoneyPage() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [sendMoney, { isLoading }] = useSendMoneyMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await sendMoney(values).unwrap();
      toast.success(res.message || "Sent successfully");
      reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Send failed");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Send Money</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            To (phone or email)
          </label>
          <Input {...register("to", { required: true })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Amount</label>
          <Input
            type="number"
            {...register("amount", { required: true, valueAsNumber: true })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Narrative</label>
          <Input {...register("narrative")} />
        </div>
        <div>
          <Button type="submit" disabled={isLoading} className="w-full">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
