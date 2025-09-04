import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWithdrawMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner"; // Import toast

const formSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  amount: z.number().min(100, "Minimum withdraw is 100৳"),
});

export default function UserWithdrawPage() {
  const [withdraw, { isLoading }] = useWithdrawMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { cardNumber: "", amount: 100 },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // ✅ Use .unwrap() to get the actual response or throw an error
      await withdraw(values).unwrap();

      // ✅ Show success toast
      toast.success(
        `Successfully withdrew ৳${values.amount} to card ${values.cardNumber}`
      );

      // ✅ Reset form after successful submission
      form.reset();
    } catch (error: any) {
      // ✅ Show error toast
      console.error("Withdraw error:", error);
      toast.error(
        error?.data?.message || "Failed to withdraw money. Please try again."
      );
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-8 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle>Withdraw to Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 5678 9012 3456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (৳)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="500"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Processing..." : "Withdraw"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
