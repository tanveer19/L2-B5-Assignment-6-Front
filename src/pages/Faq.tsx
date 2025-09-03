import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I create an account?",
    answer:
      "Click on the 'Sign Up' button on the homepage and fill out the required details to create your account.",
  },
  {
    question: "How do I deposit money into my wallet?",
    answer:
      "After logging in, go to the 'Wallet' section and select 'Deposit'. Choose your preferred method and follow the instructions.",
  },
  {
    question: "How can I withdraw funds?",
    answer:
      "Navigate to the 'Wallet' section, select 'Withdraw', enter the amount, and confirm. Your funds will be processed shortly.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Yes, we use industry-standard encryption and security protocols to protect your personal and financial data.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach out through our 'Contact' page by filling out the inquiry form or emailing us at support@bkash.com.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to the most common questions below.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="shadow-md border-0 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                {openIndex === index && (
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
