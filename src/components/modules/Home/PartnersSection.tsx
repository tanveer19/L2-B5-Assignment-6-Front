import { useState, useEffect } from "react";

interface Partner {
  id: number;
  name: string;
  initials: string;
  bgColor: string;
  textColor: string;
}

interface PartnersSectionProps {
  title?: string;
  subtitle?: string;
}

const PartnersSection = ({
  title = "Trusted By Leading Brands",
  subtitle = "We partner with the best to bring you seamless financial services",
}: PartnersSectionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const loadPartners = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setPartners([
        { id: 1, name: "Grameenphone", initials: "GP", bgColor: "bg-green-600", textColor: "text-white" },
        { id: 2, name: "Robi", initials: "Robi", bgColor: "bg-red-500", textColor: "text-white" },
        { id: 3, name: "Banglalink", initials: "BL", bgColor: "bg-orange-500", textColor: "text-white" },
        { id: 4, name: "Dutch Bangla Bank", initials: "DBBL", bgColor: "bg-blue-700", textColor: "text-white" },
        { id: 5, name: "BRAC Bank", initials: "BRAC", bgColor: "bg-purple-600", textColor: "text-white" },
        { id: 6, name: "Pathao", initials: "Pathao", bgColor: "bg-emerald-500", textColor: "text-white" },
      ]);

      setIsLoading(false);
    };

    loadPartners();
  }, []);

  const SkeletonLogo = () => (
    <div className="h-16 w-32 bg-gray-200 rounded-lg animate-pulse" />
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {isLoading ? (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonLogo key={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className={`h-16 w-32 ${partner.bgColor} rounded-lg shadow-sm flex items-center justify-center p-3 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105`}
                title={partner.name}
              >
                <span className={`${partner.textColor} font-bold text-lg`}>
                  {partner.initials}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnersSection;
