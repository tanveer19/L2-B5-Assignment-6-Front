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
import { toast } from "sonner";
import { useCashinMutation } from "@/redux/features/agent/agent.api";

const formSchema = z.object({
  phoneNumber: z.string(),
  amount: z.number(),
});

export default function AgentCashIn() {
  const [cashin, { isLoading }] = useCashinMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { phoneNumber: "", amount: 100 },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await cashin(values).unwrap(); // unwrap gives you the actual response or throws
      toast.success("cash in  successful!");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "cash in  failed. Please try again.");
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-8 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle>Cash in to Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="01600312882" {...field} />
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
                      placeholder="100"
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
              {isLoading ? "Processing..." : "Deposit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
