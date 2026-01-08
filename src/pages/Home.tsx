import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Send,
  Wallet,
  Phone,
  Shield,
  BarChart3,
  Globe,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router";
import TestimonialsSection from "@/components/modules/Home/TestimonialsSection";
import PartnersSection from "@/components/modules/Home/PartnersSection";
import PricingSection from "@/components/modules/Home/PricingSection";
import SecuritySection from "@/components/modules/Home/SecuritySection";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [features, setFeatures] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setFeatures([
        {
          id: 1,
          icon: <Send className="h-10 w-10" />,
          title: "Instant Money Transfer",
          description:
            "Send money to anyone in seconds with just their phone number.",
        },
        {
          id: 2,
          icon: <Wallet className="h-10 w-10" />,
          title: "Mobile Recharge",
          description: "Top up your mobile balance or pay bills instantly.",
        },
        {
          id: 3,
          icon: <Shield className="h-10 w-10" />,
          title: "Secure Transactions",
          description: "Bank-level security keeps your money and data safe.",
        },
        {
          id: 4,
          icon: <BarChart3 className="h-10 w-10" />,
          title: "Cashback Offers",
          description: "Enjoy exclusive cashback on payments and transfers.",
        },
        {
          id: 5,
          icon: <Globe className="h-10 w-10" />,
          title: "International Transfers",
          description: "Send money abroad quickly and at low rates.",
        },
        {
          id: 6,
          icon: <Users className="h-10 w-10" />,
          title: "Split Bills",
          description: "Easily split expenses with friends and family.",
        },
      ]);

      setStats({
        users: "60M+",
        transactions: "3B+",
        volume: "$120B+",
        merchants: "500K+",
      });

      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 transform -skew-y-3 origin-top-left"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2 space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Send, Pay & <span className="text-blue-600">Manage</span> Money
                Simply
              </h1>

              <p className="text-xl text-gray-600 max-w-lg">
                The fastest, safest, and most convenient way to handle your
                finances. Join over 60 million users today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-3 text-lg border-blue-600 text-blue-600"
                  >
                    About Us
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full bg-blue-200 border-2 border-white"
                    ></div>
                  ))}
                </div>
                <p className="text-gray-600">
                  Join 60M+ users trusting our platform
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -right-6 h-64 w-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 h-64 w-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

                <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-80 border-8 border-gray-900 transform rotate-3">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">bKash App</h3>
                    <div className="h-2 w-12 bg-gray-300 rounded"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-100 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <Send className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium">Send Money</span>
                      </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-500 rounded-full flex items-center justify-center">
                          <Wallet className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium">Cash Out</span>
                      </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-500 rounded-full flex items-center justify-center">
                          <Phone className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium">Mobile Recharge</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="h-8 w-8 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    <div className="h-6 w-16 bg-gray-300 rounded mx-auto mb-2"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded mx-auto"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">
                  {stats.users}
                </h3>
                <p className="text-gray-600">Active Users</p>
              </div>

              <div className="text-center">
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">
                  {stats.transactions}
                </h3>
                <p className="text-gray-600">Transactions</p>
              </div>

              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">
                  {stats.volume}
                </h3>
                <p className="text-gray-600">Transaction Volume</p>
              </div>

              <div className="text-center">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">
                  {stats.merchants}
                </h3>
                <p className="text-gray-600">Merchants</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide a seamless financial experience with security, speed,
              and convenience.
            </p>
          </div>

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
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="text-blue-600 mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Create Account
              </h3>
              <p className="text-gray-600">
                Download the app and register with your phone number
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Add Money
              </h3>
              <p className="text-gray-600">
                Add money to your wallet from your bank or agent
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Start Transacting
              </h3>
              <p className="text-gray-600">
                Send money, pay bills, and enjoy cashback offers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Security Section */}
      <SecuritySection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join millions of users who trust us with their financial
            transactions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              Download Now
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-blue-600 hover:bg-white/10 px-8 py-3 text-lg"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default Home;
