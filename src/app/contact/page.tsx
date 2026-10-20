"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  AlertCircle
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Dining Enquiry");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please fill in your name, email address, and message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setErrorMessage(data.message || "Failed to submit message.");
      }
    } catch (err) {
      setErrorMessage("Network error. Please reach us directly via WhatsApp or phone.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "Where exactly is Vee’s Bite & Events Center located in Tema?",
      a: "Our venue is located at Afienya Mataheko, Hallelujah, Tema, Greater Accra, Ghana. We are easily accessible from major Tema arterial roads and communities.",
    },
    {
      q: "What areas do you deliver to?",
      a: "We provide swift delivery across Tema (Communities 1 through 25), as well as nearby areas including Ashaiman, Lebanon, and Spintex Road.",
    },
    {
      q: "How early in advance should I book the event hall?",
      a: "For weddings and large weekend celebrations, we recommend booking 3 to 8 weeks in advance to secure your preferred date and venue space.",
    },
    {
      q: "Can I bring my own external decorator or DJ?",
      a: "Yes! While we offer in-house sound, lighting, and decor packages, outside decor specialists and DJs are welcome with prior coordinator sign-off.",
    },
    {
      q: "What payment methods are accepted?",
      a: "We accept MTN Mobile Money, Telecel Cash, AT Money, Bank Cards, and Cash on Delivery or Pickup.",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" />
            We’d Love to Hear from You
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Contact & Find Us
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            Have questions about our restaurant menu, group reservations, or hiring our event center? Get in touch with our team in Tema today.
          </p>
        </div>

        {/* Contact Cards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border/80 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-white mb-1">
                Our Location
              </h3>
              <p className="text-xs text-gray-400">
                Afienya Mataheko, Hallelujah, Tema, Greater Accra, Ghana
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Afienya+Mataheko+Hallelujah+Tema+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-bold text-brand-gold hover:underline inline-block"
            >
              Open in Google Maps →
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border/80 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-white mb-1">
                Call Us Directly
              </h3>
              <p className="text-xs text-gray-400">
                Orders, table reservations & urgent enquiries
              </p>
            </div>
            <a
              href="tel:+233264449211"
              className="mt-4 text-xs font-bold text-brand-gold hover:underline block"
            >
              0264 449 211
            </a>
            <a
              href="tel:+233559414013"
              className="mt-1 text-xs font-bold text-brand-gold hover:underline block"
            >
              0559 414 013
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border/80 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-white mb-1">
                WhatsApp Chat
              </h3>
              <p className="text-xs text-gray-400">
                Instant reply for meal orders and bookings
              </p>
            </div>
            <a
              href="https://wa.me/233264449211?text=Hello%20Vee's%20Bite,%20I%20have%20an%20enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-bold text-emerald-400 hover:underline inline-block"
            >
              Chat on WhatsApp →
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border/80 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-white mb-1">
                Opening Hours
              </h3>
              <p className="text-xs text-gray-400">
                Daily: Monday – Sunday
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-white block">
              10:35 AM – 10:00 PM
            </span>
          </div>
        </div>

        {/* Main Section: Contact Form + Map Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Enquiry Form */}
          <div className="lg:col-span-7 rounded-3xl bg-brand-surface border border-brand-border p-6 sm:p-10 shadow-2xl">
            <h2 className="text-2xl font-serif font-bold text-white mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-6">
              Leave your feedback, special order request, or event inquiry, and our coordinator will respond shortly.
            </p>

            {successMessage && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>
                  Thank you! Your message has been sent successfully. We will get back to you soon.
                </span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ama Boateng"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ama@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +233 24 123 4567"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                  >
                    <option value="Dining Enquiry">Restaurant Dining Enquiry</option>
                    <option value="Event Center Booking">Event Center Hall Hire</option>
                    <option value="Bulk Order Catering">Bulk Food Catering / Party Pans</option>
                    <option value="Feedback">Feedback / Review</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can Vee's Bite assist you today?"
                  className="w-full p-4 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-5 rounded-3xl bg-brand-surface border border-brand-border overflow-hidden shadow-2xl relative min-h-[350px] flex flex-col">
            <div className="p-4 bg-brand-darker border-b border-brand-border flex items-center justify-between">
              <span className="text-xs font-bold text-brand-gold flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                Tema Location Map
              </span>
              <span className="text-[11px] text-gray-400">QX3P+PW8</span>
            </div>

            <div className="flex-1 relative min-h-[300px]">
              <iframe
                title="Vee's Bite & Events Center Map Location"
                src="https://maps.google.com/maps?q=QX3P%2BPW8+Tema+Ghana&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0 filter invert-[0.9] hue-rotate-[180deg] opacity-90"
                loading="lazy"
              />
            </div>

            <div className="p-4 bg-brand-darker border-t border-brand-border text-center">
              <a
                href="https://maps.google.com/?q=QX3P%2BPW8,+Tema,+Ghana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-gold hover:underline flex items-center justify-center gap-1.5"
              >
                Launch Google Maps Navigation →
              </a>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-1">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-brand-surface border border-brand-border/70"
              >
                <h4 className="font-serif font-bold text-base text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-gold shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
