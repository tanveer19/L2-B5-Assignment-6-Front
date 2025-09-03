import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-blue-600">Us</span>
          </h1>
          <p className="text-lg text-gray-600">
            Have questions or inquiries? Fill out the form and we’ll get back to
            you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="shadow-md border-0">
              <CardContent className="flex items-center gap-4 p-6">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">support@bkash.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0">
              <CardContent className="flex items-center gap-4 p-6">
                <Phone className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600">+880 1234 567 890</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0">
              <CardContent className="flex items-center gap-4 p-6">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600">Dhaka, Bangladesh, 1207</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inquiry Form */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="bg-green-100 text-green-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    ✅
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We’ll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
