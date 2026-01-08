import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
}

const TestimonialsSection = ({
  title = "What Our Users Say",
  subtitle = "Trusted by millions of users across the country",
}: TestimonialsSectionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const loadTestimonials = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTestimonials([
        {
          id: 1,
          name: "Rahim Ahmed",
          role: "Small Business Owner",
          avatar: "RA",
          rating: 5,
          comment:
            "This app has transformed how I manage my business payments. Fast, secure, and incredibly easy to use!",
        },
        {
          id: 2,
          name: "Fatima Khan",
          role: "Freelancer",
          avatar: "FK",
          rating: 5,
          comment:
            "I receive payments from clients instantly. The cashback offers are a great bonus too!",
        },
        {
          id: 3,
          name: "Kamal Hossain",
          role: "Student",
          avatar: "KH",
          rating: 4,
          comment:
            "Sending money to family has never been easier. The app is simple and works perfectly every time.",
        },
      ]);

      setIsLoading(false);
    };

    loadTestimonials();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const SkeletonCard = () => (
    <Card className="border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300 relative"
              >
                <CardContent className="p-6">
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-blue-100" />
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-600">{testimonial.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
