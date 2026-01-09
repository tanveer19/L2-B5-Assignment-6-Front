import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface PricingSectionProps {
  title?: string;
  subtitle?: string;
}

const PricingSection = ({
  title = "Simple, Transparent Pricing",
  subtitle = "Choose the plan that works best for you",
}: PricingSectionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState<PricingPlan[]>([]);

  useEffect(() => {
    const loadPlans = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setPlans([
        {
          id: 1,
          name: "Basic",
          price: "Free",
          period: "",
          description: "Perfect for personal use",
          features: [
            "Send money up to ৳25,000/day",
            "Mobile recharge",
            "Bill payments",
            "Basic support",
          ],
        },
        {
          id: 2,
          name: "Premium",
          price: "৳99",
          period: "/month",
          description: "Best for frequent users",
          features: [
            "Send money up to ৳100,000/day",
            "Priority support",
            "Lower transaction fees",
            "Exclusive cashback offers",
            "International transfers",
          ],
          popular: true,
        },
        {
          id: 3,
          name: "Business",
          price: "৳499",
          period: "/month",
          description: "For merchants & businesses",
          features: [
            "Unlimited transactions",
            "Dedicated account manager",
            "API access",
            "Custom reports",
            "Multi-user access",
            "Priority processing",
          ],
        },
      ]);

      setIsLoading(false);
    };

    loadPlans();
  }, []);

  const SkeletonCard = () => (
    <Card className="border-0 shadow-md">
      <CardHeader className="text-center pb-2">
        <div className="h-6 w-24 bg-gray-300 rounded mx-auto mb-2 animate-pulse" />
        <div className="h-10 w-20 bg-gray-300 rounded mx-auto animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        ))}
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`border-0 shadow-md hover:shadow-lg transition-all duration-300 relative flex flex-col ${
                  plan.popular ? "ring-2 ring-blue-600" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;
