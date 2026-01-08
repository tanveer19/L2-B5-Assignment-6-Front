import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Fingerprint, Server, BadgeCheck } from "lucide-react";

interface SecurityFeature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface SecuritySectionProps {
  title?: string;
  subtitle?: string;
}

const SecuritySection = ({
  title = "Your Security Is Our Priority",
  subtitle = "We use industry-leading security measures to protect your money and data",
}: SecuritySectionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [features, setFeatures] = useState<SecurityFeature[]>([]);

  useEffect(() => {
    const loadFeatures = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setFeatures([
        {
          id: 1,
          icon: <Lock className="h-8 w-8" />,
          title: "256-bit Encryption",
          description: "All data is encrypted using bank-grade AES-256 encryption",
        },
        {
          id: 2,
          icon: <Fingerprint className="h-8 w-8" />,
          title: "Biometric Authentication",
          description: "Secure login with fingerprint or face recognition",
        },
        {
          id: 3,
          icon: <Eye className="h-8 w-8" />,
          title: "24/7 Fraud Monitoring",
          description: "Real-time monitoring to detect suspicious activities",
        },
        {
          id: 4,
          icon: <Server className="h-8 w-8" />,
          title: "Secure Data Centers",
          description: "Your data is stored in PCI-DSS compliant data centers",
        },
        {
          id: 5,
          icon: <Shield className="h-8 w-8" />,
          title: "Two-Factor Authentication",
          description: "Extra layer of security with OTP verification",
        },
        {
          id: 6,
          icon: <BadgeCheck className="h-8 w-8" />,
          title: "Regulatory Compliance",
          description: "Licensed and regulated by Bangladesh Bank",
        },
      ]);

      setIsLoading(false);
    };

    loadFeatures();
  }, []);

  const SkeletonCard = () => (
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 bg-gray-300 rounded-lg animate-pulse flex-shrink-0" />
      <div className="space-y-2 flex-1">
        <div className="h-5 w-32 bg-gray-300 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-blue-600 rounded-full mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <SkeletonCard />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-green-500" />
            <span>PCI-DSS Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-green-500" />
            <span>ISO 27001 Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-green-500" />
            <span>Bangladesh Bank Licensed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
