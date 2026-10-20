"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EventType, EventSpace, CateringPreference } from "@/types";
import confetti from "canvas-confetti";
import { 
  Calendar, 
  Users, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Wine, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Building2, 
  Trees, 
  UtensilsCrossed,
  Music,
  Tv,
  AlertCircle
} from "lucide-react";

export default function EventsPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState<EventType>("WEDDING");
  const [preferredDate, setPreferredDate] = useState("");
  const [alternateDate, setAlternateDate] = useState("");
  const [startTime, setStartTime] = useState("14:00");
  const [endTime, setEndTime] = useState("20:00");
  const [guestCount, setGuestCount] = useState<number>(100);
  const [spacePreference, setSpacePreference] = useState<EventSpace>("MAIN_HALL");
  const [cateringOption, setCateringOption] = useState<CateringPreference>("BUFFET");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const spaces = [
    {
      id: "MAIN_HALL",
      title: "The Grand Banquet Hall",
      tagline: "Elegance, Air Conditioning & Sound for Big Celebrations",
      capacity: "150 – 250 Guests",
      features: [
        "Full climate-controlled air conditioning",
        "Celebration stage & podium with gold draping",
        "Surround PA sound system & dual wireless mics",
        "Round banquet tables with gold chiavari chairs",
        "Dedicated bridal / VIP dressing suite",
      ],
      image: "/images/event_hall.jpg",
    },
    {
      id: "GARDEN_TERRACE",
      title: "Open-Air Garden Terrace",
      tagline: "Twilight Ambiance with Warm Fairy Lights & Breezy Palms",
      capacity: "50 – 100 Guests",
      features: [
        "Enchanting canopy string light installation",
        "Open-air tropical palm garden ambiance",
        "Rustic cocktail bar & lounge seating",
        "Perfect for 30th/40th birthdays & cocktail soirees",
        "Outdoor acoustic & DJ setup permitted",
      ],
      image: "/images/garden_terrace.jpg",
    },
    {
      id: "VIP_LOUNGE",
      title: "Executive VIP Dining Lounge",
      tagline: "Intimate, Private & Sophisticated",
      capacity: "20 – 40 Guests",
      features: [
        "Plush upholstered executive seating",
        "High-definition TV presentation screen",
        "Dedicated culinary steward & bar attendant",
        "Ideal for corporate meetings & intimate dinners",
        "Tailored multi-course plated dinner menus",
      ],
      image: "/images/hero.jpg",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !phone.trim() || !preferredDate) {
      setErrorMessage("Please complete all required fields (Name, Phone number, and Preferred Date).");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          eventType,
          preferredDate,
          alternateDate: alternateDate || undefined,
          startTime,
          endTime,
          guestCount: Number(guestCount),
          cateringOption,
          spacePreference,
          additionalNotes,
        }),
      });

      const data = await res.json();
      if (data.success && data.booking) {
        setBookingSuccess(data.booking);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } else {
        setErrorMessage(data.message || "Failed to submit booking enquiry.");
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again or reach us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppBookingUrl = () => {
    const text = `Hello Vee's Bite & Events Center,%0A%0AI would like to enquire about booking your venue:%0AName: ${fullName || "Customer"}%0APhone: ${phone}%0AEvent Type: ${eventType}%0APreferred Date: ${preferredDate}%0AGuests: ${guestCount}%0ASpace: ${spacePreference}%0ACatering: ${cateringOption}%0ANotes: ${additionalNotes}%0A%0APlease let me know venue availability!`;
    return `https://wa.me/233201496782?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-brand-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" />
            Tema's Celebrated Event Venue
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Host Your Next Event at Vee’s
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            From fairytale wedding receptions and milestone birthday celebrations to corporate banquets, our flexible indoor halls and outdoor terrace provide the atmosphere, sound, lighting, and mouth-watering catering you deserve.
          </p>
        </div>

        {/* Venue Spaces Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="rounded-3xl bg-brand-surface border border-brand-border/80 overflow-hidden flex flex-col justify-between hover:border-brand-gold/50 transition-all duration-300 shadow-xl group"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-brand-gold text-xs font-bold border border-brand-gold/30 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {space.capacity}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif font-bold text-xl text-white group-hover:text-brand-gold transition-colors">
                    {space.title}
                  </h3>
                  <p className="text-xs text-brand-gold font-medium mt-1">
                    {space.tagline}
                  </p>

                  <div className="mt-5 space-y-2.5">
                    {space.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    setSpacePreference(space.id as EventSpace);
                    document.getElementById("booking-form-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-2.5 rounded-xl bg-brand-surfaceLight hover:bg-brand-gold text-white hover:text-brand-dark border border-brand-border text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Select This Space
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form Section */}
        <div id="booking-form-section" className="scroll-mt-24">
          <div className="rounded-3xl bg-gradient-to-br from-brand-surface to-brand-darker border border-brand-border p-6 sm:p-12 shadow-2xl">
            {bookingSuccess ? (
              <div className="text-center py-10 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-1">
                  Enquiry Received
                </span>
                <h2 className="text-3xl font-serif font-bold text-white mb-2">
                  Booking Request #{bookingSuccess.bookingNumber} Submitted!
                </h2>
                <p className="text-sm text-gray-300 mb-6">
                  Thank you, <strong>{bookingSuccess.fullName}</strong>. Our events manager will review venue availability for <strong>{bookingSuccess.preferredDate}</strong> and reach out to you at <strong>{bookingSuccess.phone}</strong> with a detailed package proposal.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={getWhatsAppBookingUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp Now
                  </a>
                  <button
                    onClick={() => setBookingSuccess(null)}
                    className="px-6 py-3.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="max-w-2xl mb-8">
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-1">
                    Direct Reservation & Enquiry
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    Request Venue Dates & Pricing
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Fill out this form and our team in Tema will verify schedule availability, provide hall hire rates, and discuss catering options.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Dr. Emmanuel Darko"
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Phone Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +233 24 555 4321"
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. contact@email.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  {/* Row 2: Event Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Event Type *
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value as EventType)}
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                      >
                        <option value="WEDDING">Wedding & Reception</option>
                        <option value="BIRTHDAY">Birthday Celebration</option>
                        <option value="CORPORATE">Corporate Conference / AGM</option>
                        <option value="PARTY">Private Party / Cocktail</option>
                        <option value="FAMILY">Family Gathering / Funeral Reception</option>
                        <option value="OTHER">Other Special Occasion</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Alternate Date (Backup)
                      </label>
                      <input
                        type="date"
                        value={alternateDate}
                        onChange={(e) => setAlternateDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  {/* Row 3: Times, Guests, and Venue Space */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Estimated Guests *
                      </label>
                      <input
                        type="number"
                        min={10}
                        max={350}
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Space Preference *
                      </label>
                      <select
                        value={spacePreference}
                        onChange={(e) => setSpacePreference(e.target.value as EventSpace)}
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                      >
                        <option value="MAIN_HALL">The Grand Banquet Hall (150+)</option>
                        <option value="GARDEN_TERRACE">Open-Air Garden Terrace (80+)</option>
                        <option value="VIP_LOUNGE">VIP Private Dining Lounge (35+)</option>
                        <option value="CHILDREN_GROUND">Children&apos;s Playing Ground</option>
                        <option value="FULL_VENUE">Full Venue Buyout</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Catering Choice & Notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Catering & Food Requirements *
                      </label>
                      <select
                        value={cateringOption}
                        onChange={(e) => setCateringOption(e.target.value as CateringPreference)}
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                      >
                        <option value="BUFFET">Full Buffet (Jollof, Fried Rice, Fish & Meats)</option>
                        <option value="PLATED">Plated Executive Multi-Course</option>
                        <option value="FINGER_FOODS">Finger Foods, Small Chops & Cocktails</option>
                        <option value="EXTERNAL">Hall Rental Only (External Caterer)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Special Requests / Decor / Audio-Visual
                      </label>
                      <input
                        type="text"
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        placeholder="e.g. Stage lighting, gold and white theme, projector screen..."
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 rounded-xl gold-btn text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        "Submitting Enquiry..."
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          Submit Event Reservation Enquiry
                        </>
                      )}
                    </button>

                    <a
                      href={getWhatsAppBookingUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Enquire via WhatsApp
                    </a>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
