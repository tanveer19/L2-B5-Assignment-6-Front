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
import { useDepositMutation } from "@/redux/features/user/user.api"; // your API

const formSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  amount: z.number().min(50, "Minimum deposit is 50৳"),
});

export default function UserDepositPage() {
  const [deposit, { isLoading }] = useDepositMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { cardNumber: "", amount: 100 },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await deposit(values);
    form.reset();
  }

  return (
    <Card className="max-w-md mx-auto mt-8 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle>Deposit to Wallet</CardTitle>
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
                    <Input type="number" placeholder="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Processing..." : "Deposit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
