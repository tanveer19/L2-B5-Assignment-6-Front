import { useState, useEffect } from "react";
import {
  Send,
  Wallet,
  Shield,
  BarChart3,
  Globe,
  Users,
  Phone,
  CreditCard,
  Zap,
  Lock,
  Download,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Features = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [features, setFeatures] = useState<any[]>([]);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFeatures([
        {
          id: 1,
          icon: <Send className="h-10 w-10" />,
          title: "Instant Money Transfer",
          description:
            "Send money to anyone in seconds with just their phone number. No bank account needed.",
          benefits: [
            "24/7 availability",
            "No hidden fees",
            "Instant notification",
          ],
          color: "blue",
        },
        {
          id: 2,
          icon: <Wallet className="h-10 w-10" />,
          title: "Mobile Recharge & Bill Pay",
          description:
            "Top up your mobile balance or pay utility bills instantly from the app.",
          benefits: [
            "All operators supported",
            "Schedule payments",
            "Payment history",
          ],
          color: "green",
        },
        {
          id: 3,
          icon: <Shield className="h-10 w-10" />,
          title: "Bank-Level Security",
          description:
            "Your money and data are protected with advanced encryption and security protocols.",
          benefits: [
            "Biometric authentication",
            "Transaction monitoring",
            "FDIC insured",
          ],
          color: "purple",
        },
        {
          id: 4,
          icon: <BarChart3 className="h-10 w-10" />,
          title: "Cashback & Rewards",
          description:
            "Earn cashback on transactions and unlock exclusive rewards as you use the app.",
          benefits: ["Personalized offers", "Loyalty program", "Bonus rewards"],
          color: "orange",
        },
        {
          id: 5,
          icon: <Globe className="h-10 w-10" />,
          title: "International Transfers",
          description:
            "Send money abroad quickly and at much lower rates than traditional services.",
          benefits: [
            "150+ countries",
            "Best exchange rates",
            "Track transfers",
          ],
          color: "teal",
        },
        {
          id: 6,
          icon: <Users className="h-10 w-10" />,
          title: "Split Bills & Group Payments",
          description:
            "Easily split expenses with friends and request payments from groups.",
          benefits: ["Custom amounts", "Payment reminders", "Settle up easily"],
          color: "pink",
        },
        {
          id: 7,
          icon: <CreditCard className="h-10 w-10" />,
          title: "Virtual Cards",
          description:
            "Generate virtual cards for online shopping with controlled spending limits.",
          benefits: [
            "One-time use cards",
            "Set spending limits",
            "Instant creation",
          ],
          color: "indigo",
        },
        {
          id: 8,
          icon: <Lock className="h-10 w-10" />,
          title: "Savings & Budgeting",
          description:
            "Set aside money automatically and track your spending with smart budgeting tools.",
          benefits: [
            "Auto-save rules",
            "Spending categories",
            "Financial insights",
          ],
          color: "yellow",
        },
      ]);

      setIsLoading(false);
    };

    loadData();
  }, []);

  const getColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-600";
      case "green":
        return "bg-green-100 text-green-600";
      case "purple":
        return "bg-purple-100 text-purple-600";
      case "orange":
        return "bg-orange-100 text-orange-600";
      case "teal":
        return "bg-teal-100 text-teal-600";
      case "pink":
        return "bg-pink-100 text-pink-600";
      case "indigo":
        return "bg-indigo-100 text-indigo-600";
      case "yellow":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Everything you need to manage your money, make payments, and grow
            your savings - all in one app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Download App
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card
                  key={i}
                  className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="h-10 w-10 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-6 w-32 bg-gray-300 rounded mb-3"></div>
                    <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                    <div className="mt-4 space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div
                      className={`p-3 rounded-xl inline-flex mb-4 ${getColorClass(
                        feature.color
                      )}`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map(
                        (benefit: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">
                              {benefit}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Highlight Feature 1 */}
      <section className="py-16 bg-blue-50 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-blue-100 p-3 rounded-xl inline-flex mb-6">
                <Zap className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Lightning Fast Transfers
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Send and receive money in seconds, not days. Our advanced
                technology ensures your transactions are processed instantly,
                24/7.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    No waiting for business hours
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Real-time transaction updates
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Instant recipient notifications
                  </span>
                </li>
              </ul>
              <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -right-6 h-64 w-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 h-64 w-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

                <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-80 border-8 border-gray-900">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Send Money</h3>
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Complete
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">From</div>
                      <div className="font-medium">My Wallet • $1,245.00</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-1">To</div>
                      <div className="font-medium">Maria Rodriguez</div>
                      <div className="text-sm text-gray-600">
                        +1 (555) 123-4567
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-1">Amount</div>
                      <div className="font-medium text-xl">$50.00</div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">
                        Transfer completed
                      </span>
                    </div>
                    <div className="text-sm text-green-700 mt-1">
                      The money was sent instantly
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Feature 2 */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 h-64 w-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>

                <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-80 border-8 border-gray-900">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Security Settings</h3>
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Biometric Login</span>
                      <div className="h-6 w-11 bg-blue-600 rounded-full relative">
                        <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Transaction PIN</span>
                      <div className="h-6 w-11 bg-blue-600 rounded-full relative">
                        <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">
                        2-Factor Authentication
                      </span>
                      <div className="h-6 w-11 bg-gray-300 rounded-full relative">
                        <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Login Alerts</span>
                      <div className="h-6 w-11 bg-blue-600 rounded-full relative">
                        <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-center text-gray-500">
                    Last updated: Just now
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-purple-100 p-3 rounded-xl inline-flex mb-6">
                <Lock className="h-10 w-10 text-purple-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Advanced Security
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Your security is our top priority. We use bank-level encryption
                and multiple authentication methods to keep your money and data
                safe.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    256-bit encryption for all data
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Biometric and PIN protection
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">24/7 fraud monitoring</span>
                </li>
              </ul>
              <Button className="bg-purple-600 hover:bg-purple-700 px-6 py-3">
                Explore Security
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Users Love Our App
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Join millions of satisfied users who trust us with their financial
              transactions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">60M+</h3>
              <p className="text-gray-700">Active Users</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Send className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">3B+</h3>
              <p className="text-gray-700">Transactions</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">15+</h3>
              <p className="text-gray-700">Countries</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Star className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">4.8/5</h3>
              <p className="text-gray-700">App Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of users who trust us with their financial
            transactions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              Get Started Now
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-blue-600 hover:bg-white/10 px-8 py-3 text-lg"
            >
              See All Features
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Star icon component since it's not imported from lucide-react
const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default Features;
