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
import { useSendMoneyMutation } from "@/redux/features/user/user.api";

const formSchema = z.object({
  recipient: z.string().min(3, "Enter phone or email"),
  amount: z.number().min(50, "Minimum send is 50৳"),
});

export default function UserSendMoneyPage() {
  const [sendMoney, { isLoading }] = useSendMoneyMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { recipient: "", amount: 100 },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await sendMoney({
      to: values.recipient,
      amount: values.amount,
    });
    // form.reset();
  }

  return (
    <Card className="max-w-md mx-auto mt-8 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle>Send Money</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient (Phone or Email)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="01812345678 or user@example.com"
                      {...field}
                    />
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
                      min={50}
                      placeholder="200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Sending..." : "Send Money"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
