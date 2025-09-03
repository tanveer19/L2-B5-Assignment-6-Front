import { useState, useEffect } from "react";
import {
  Target,
  Eye,
  Heart,
  Shield,
  Users,
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTeamMembers([
        {
          id: 1,
          name: "John Doe",
          role: "CEO & Founder",
          bio: "Former financial executive with 15+ years in digital payments",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          joinDate: "2015",
          location: "New York, USA",
        },
        {
          id: 2,
          name: "Michael Chen",
          role: "CTO",
          bio: "Tech visionary with expertise in secure financial systems",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          joinDate: "2016",
          location: "San Francisco, USA",
        },
        {
          id: 3,
          name: "John Connor",
          role: "Head of Product",
          bio: "Product strategist passionate about financial inclusion",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          joinDate: "2017",
          location: "London, UK",
        },
        {
          id: 4,
          name: "David Kim",
          role: "Head of Security",
          bio: "Cybersecurity expert with focus on financial systems",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          joinDate: "2018",
          location: "Singapore",
        },
      ]);

      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our Story
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Revolutionizing digital payments since 2015 with a vision to make
            financial services accessible to everyone.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How We Started
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Founded in 2015, bKash began with a simple mission: to make
                  financial services accessible to everyone, regardless of their
                  location or economic status. What started as a small startup
                  with just five employees has now grown into a leading
                  financial technology company serving millions of users across
                  multiple countries.
                </p>
                <p>
                  Our journey began when our founder, John Doe, witnessed the
                  challenges faced by unbanked populations in accessing basic
                  financial services. She assembled a team of passionate experts
                  in finance and technology to build a solution that would
                  bridge this gap.
                </p>
                <p>
                  Today, we're proud to have processed over 3 billion
                  transactions and helped millions of people experience the
                  freedom and security of digital payments for the first time.
                </p>
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="bg-blue-100 rounded-2xl p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Our Milestones
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                      1M
                    </div>
                    <p>Users within first year of launch</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                      10+
                    </div>
                    <p>Countries we operate in</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                      60M+
                    </div>
                    <p>Active users today</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                      99.9%
                    </div>
                    <p>System uptime reliability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-blue-50 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Driving financial inclusion through innovative technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Our Mission
                  </h3>
                </div>
                <p className="text-gray-700">
                  To create a world where everyone has access to secure,
                  affordable, and convenient financial services. We're committed
                  to breaking down barriers to financial inclusion by leveraging
                  technology to build solutions that empower individuals and
                  businesses alike.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Eye className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Our Vision
                  </h3>
                </div>
                <p className="text-gray-700">
                  To be the leading digital financial services platform in
                  emerging markets, transforming how people save, spend, and
                  manage their money. We envision a future where financial
                  freedom is not a privilege but a fundamental right for all.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Customer First
              </h3>
              <p className="text-gray-700">
                Our customers are at the heart of everything we do. We listen,
                learn, and innovate to meet their evolving needs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Security & Trust
              </h3>
              <p className="text-gray-700">
                We prioritize the security of our users' data and funds,
                building trust through transparency and reliability.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Inclusion
              </h3>
              <p className="text-gray-700">
                We believe financial services should be accessible to everyone,
                regardless of their background or location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind our success
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-0 shadow-md overflow-hidden">
                  <div className="h-60 bg-gray-300 animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <Card
                  key={member.id}
                  className="border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="h-60 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-700 mb-4">{member.bio}</p>

                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Since {member.joinDate}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{member.location}</span>
                    </div>

                    <div className="flex space-x-3">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recognition & Awards
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized globally
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="bg-yellow-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Best FinTech App 2023
              </h3>
              <p className="text-gray-700">
                Global FinTech Awards for innovation in digital payments
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="bg-blue-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Security Excellence Award
              </h3>
              <p className="text-gray-700">
                Recognized for outstanding security practices in financial
                services
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Social Impact Award
              </h3>
              <p className="text-gray-700">
                For promoting financial inclusion in underserved communities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of a team that's transforming financial services for
            millions of people.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              View Open Positions
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-blue-600 hover:bg-white/10 px-8 py-3 text-lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
