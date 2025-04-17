import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS with your user ID (public key)
      emailjs.init("a779AWRXZ-BFm5EfZ");
      
      // Make sure all form fields are included in the template params
      const templateParams = {
        to_name: "Admin", // The recipient's name in the email template
        from_name: formData.name,
        from_email: formData.email,
        phone_number: formData.phone, // Make sure this matches your template variable
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email // This helps you reply directly to the sender
      };

      const result = await emailjs.send(
        "service_xzm5uka", 
        "template_putrlbf",
        templateParams
      );
      
      console.log("Email sent successfully:", result);
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      question: " Are Ecovluu products suitable for all hair types?",
      answer: "Yes! Our formulas are crafted to support a wide range of hair types—from fine and straight to coily, dry, or color-treated. Each product balances scalp care with deep nourishment, without weighing the hair down."
    },
    {
      question: " Do your products contain sulfates, silicones, or parabens?",
      answer: "No SLS, no SLSA, no silicones, no parabens. The Hair Mask – Concentrate is 100% sulfate-free, making it ideal for dry, damaged, or sensitive hair."
    },
    {
      question: " Are your products vegan and cruelty-free?",
      answer: "Yes, Ecovluu is cruelty-free—we do not test on animals at any stage. The Deep Hydrating Shampoo is vegan. The Hair Mask contains hydrolyzed keratin, which is traditionally animal-derived."
    },
    {
      question: " Can I use Ecovluu products on color-treated hair?",
      answer: "Absolutely. Our formulas are color-safe and designed to maintain hydration and fiber integrity, helping prolong the vibrancy of your hair color."
    },
    {
      question: " What makes Ecovluu different from other clean hair care brands?",
      answer: "Ecovluu bridges the gap between clean beauty and professional performance. We combine high-performance botanical actives, amino acids, and modern green science with a commitment to transparency and ingredient purity."
    },
    {
      question: " How often should I use the Hair Mask – Concentrate?",
      answer: "Use it 1 time per week to deeply nourish and repair. For stressed or chemically treated hair, increase as needed. Leave on for at least 10 minutes to allow full absorption."
    },
    {
      question: " Are your products safe for sensitive scalps?",
      answer: "Yes. Our formulations are gentle, pH-balanced, and free from harsh or irritating ingredients. If you have specific sensitivities, we recommend a patch test before full use."
    },
    {
      question: " Where are Ecovluu products made?",
      answer: "All Ecovluu products are handmade in the European Union, in small batches, with care and precision. This artisanal approach ensures freshness, quality control, and a personal touch in every bottle."
    },
    {
      question: " Do you offer samples or travel sizes?",
      answer: "Not yet—but we’re working on it! Join our newsletter to be the first to hear about sample kits, travel editions, and new releases."
    }
  ];

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-2 text-center">Contact Us</h1>
          <p className="text-center text-gray-600 mb-12">
            Have questions? We're here to help you with your hair care journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-brand-brown/10 p-4 rounded-full mb-4">
                <Phone className="h-6 w-6 text-brand-brown" />
              </div>
              <h3 className="text-lg font-bold mb-2">Call Us</h3>
              <p className="text-gray-700"></p>
              <p className="text-gray-500">Mon-Fri, 9am-5pm</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-brand-brown/10 p-4 rounded-full mb-4">
                <Mail className="h-6 w-6 text-brand-brown" />
              </div>
              <h3 className="text-lg font-bold mb-2">Email Us</h3>
              <p className="text-gray-700">ecovluu@gmail.com</p>
              <p className="text-gray-500">We'll respond within 24 hours</p>
            </div>
            </div>
            
            
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-1 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-1 font-medium">
                    Subject*
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Hair Consultation">Hair Consultation</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-1 font-medium">
                    Your Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  ></textarea>
                </div>
                
                <Button
                  type="submit"
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
              <div className="bg-gray-100 p-6 rounded-lg">
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="my-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-brand-brown">Still Have Questions?</h2>
              <p className="text-gray-600 mt-2  mx-auto">
                Want to know more about healthy eating and the services I offer? Drop the questions and answers section below or contact me in a way convenient for you.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                    <AccordionTrigger className="text-left font-medium hover:text-brand-orange">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
