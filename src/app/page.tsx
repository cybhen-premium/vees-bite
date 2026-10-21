"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { INITIAL_MENU_ITEMS } from "@/lib/data-store";
import { MenuItem, EventType, EventSpace, CateringPreference } from "@/types";
import {
  UtensilsCrossed,
  Calendar,
  Sparkles,
  Flame,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  Trees,
  ShoppingBag,
  Plus,
  ChevronRight,
  ChevronDown,
  Music,
  Tv,
  Smile,
  Star,
  Quote,
  Wine
} from "lucide-react";

export default function HomePage() {
  const { addItem, openCart } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Menu preview accordion state
  const [expandedPreview, setExpandedPreview] = useState<number>(0);

  // Reservation form state
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [resType, setResType] = useState<EventType>("WEDDING");
  const [resSpace, setResSpace] = useState<EventSpace>("MAIN_HALL");
  const [resCatering, setResCatering] = useState<CateringPreference>("BUFFET");
  const [resDate, setResDate] = useState("");
  const [resGuests, setResGuests] = useState("100");
  const [resNotes, setResNotes] = useState("");
  const [resSubmitting, setResSubmitting] = useState(false);
  const [resSuccess, setResSuccess] = useState(false);

  const handleQuickAdd = (dish: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(dish, 1);
    setToastMessage(`Added 1x ${dish.name} to basket!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName || !resPhone || !resDate) return;

    setResSubmitting(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: resName,
          phone: resPhone,
          eventType: resType,
          spacePreference: resSpace,
          cateringOption: resCatering,
          preferredDate: resDate,
          guestCount: parseInt(resGuests) || 50,
          additionalNotes: resNotes || `Reservation for ${resType} at ${resSpace}`,
        }),
      });

      if (res.ok) {
        setResSuccess(true);
        setResName("");
        setResPhone("");
        setResDate("");
        setResNotes("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setResSubmitting(false);
    }
  };

  // Preview menu categories for the right column
  const menuPreviewCategories = [
    {
      id: 0,
      title: "Local Ghanaian Classics",
      subtitle: "Jollof Rice, Fresh Banku & Tilapia, Waakye Fiesta, Kelewele",
      items: INITIAL_MENU_ITEMS.filter((i) => ["dish-1", "dish-2", "dish-3", "dish-4"].includes(i.id)),
    },
    {
      id: 1,
      title: "Main Meals, Grills & Barbecue",
      subtitle: "Assorted Fried Rice, Spicy Suya Beef, Grilled Guinea Fowl, BBQ Ribs",
      items: INITIAL_MENU_ITEMS.filter((i) => ["dish-5", "dish-7", "dish-6", "dish-14"].includes(i.id)),
    },
    {
      id: 2,
      title: "Artisanal Pastries, Popcorn & Pizzas",
      subtitle: "Golden Meat Pies, Spring Rolls, Hot Popcorn, Margherita Pizza",
      items: INITIAL_MENU_ITEMS.filter((i) => ["dish-12", "dish-13", "dish-15"].includes(i.id)),
    },
    {
      id: 3,
      title: "Chilled Refreshing Beverages & Bar",
      subtitle: "House Spiced Sobolo, Fresh Pineapple Juice, Malt & Soft Drinks",
      items: INITIAL_MENU_ITEMS.filter((i) => ["dish-8", "dish-9", "dish-10"].includes(i.id)),
    },
  ];

  const featuredDish1 = INITIAL_MENU_ITEMS.find((d) => d.id === "dish-1") || INITIAL_MENU_ITEMS[0];
  const featuredDish2 = INITIAL_MENU_ITEMS.find((d) => d.id === "dish-2") || INITIAL_MENU_ITEMS[1];

  return (
    <div className="min-h-screen bg-[#0C271F] text-gray-100 flex flex-col selection:bg-[#F25C05] selection:text-white overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#081E17] border border-[#F25C05] text-white px-5 py-3.5 rounded-xl shadow-2xl animate-bounce transition-all">
          <div className="w-7 h-7 rounded-full bg-[#F25C05]/20 flex items-center justify-center text-[#F25C05]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#F25C05]">Basket Updated</p>
            <p className="text-sm font-medium text-gray-100">{toastMessage}</p>
          </div>
          <button
            onClick={() => {
              setToastMessage(null);
              openCart();
            }}
            className="ml-3 px-3 py-1.5 rounded-md bg-[#F25C05] text-white text-xs font-bold hover:brightness-110 transition-transform cursor-pointer"
          >
            View Cart
          </button>
        </div>
      )}

      {/* 1. HERO SECTION (Reference Image Layout with dark food backdrop & curved bottom) */}
      <section className="relative w-full bg-[#0C271F]">
        <div className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden rounded-b-[40px] md:rounded-b-[56px] shadow-2xl border-b border-[#143B30]">
          {/* Hero Food Photography Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/ref_hero_dish.jpg"
              alt="Vee's Bite Fine Dining & Grills"
              fill
              priority
              className="object-cover object-center scale-100"
            />
            {/* Dark Vignette Overlay for readable text */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/35" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 flex flex-col justify-center h-full">
            <div className="max-w-2xl space-y-6">
              {/* Top Orange Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F25C05] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Afienya Mataheko, Hallelujah • Tema</span>
              </div>

              {/* Bold White Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1]">
                Authentic Flavors.{" "}
                <span className="block text-[#F25C05]">Upscale Dining.</span>
              </h1>

              {/* Supporting Text incorporating all business services */}
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal max-w-xl">
                Savor freshly prepared Ghanaian delicacies—from our signature smoky Jollof, whole charcoal-grilled Tilapia, and barbecue ribs to pastries, popcorn &amp; pizza. Host dream weddings, receptions, and corporate banquets in our air-conditioned Grand Hall and starlit Garden Terrace.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  href="/order"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#F25C05] hover:bg-[#D94E00] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Online</span>
                </Link>

                <Link
                  href="/events"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 backdrop-blur-md transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#F25C05]" />
                  <span>Book Event Space</span>
                </Link>

                <a
                  href="https://wa.me/233264449211?text=Hello%20Vee's%20Bite,%20I%20would%20like%20to%20make%20an%20inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-md bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Center Indicator Dot */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <div className="w-3 h-3 rounded-full border-2 border-white/60 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURE HIGHLIGHTS (Reference Design - Clean White Background) */}
      <section className="bg-white text-gray-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-950 tracking-tight">
              Culinary Excellence &amp; Events
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 font-normal">
              Freshly prepared local &amp; continental dishes, pasties, serene banquet facilities, and live cultural entertainment.
            </p>
          </div>

          {/* 4 Feature Columns with Orange Circle Badges (incorporating all flyer services) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#F25C05]/15 border border-[#F25C05]/30 flex items-center justify-center text-[#F25C05] shrink-0">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Food &amp; Grills</h3>
                <p className="text-xs text-gray-500 font-normal">Jollof, Banku, Tilapia &amp; Suya</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#F25C05]/15 border border-[#F25C05]/30 flex items-center justify-center text-[#F25C05] shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Pastries, Popcorn &amp; Pizza</h3>
                <p className="text-xs text-gray-500 font-normal">Meat pies, snacks &amp; delivery</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#F25C05]/15 border border-[#F25C05]/30 flex items-center justify-center text-[#F25C05] shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Grand Event Hall</h3>
                <p className="text-xs text-gray-500 font-normal">250-guest AC ballroom &amp; lawn</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#F25C05]/15 border border-[#F25C05]/30 flex items-center justify-center text-[#F25C05] shrink-0">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Live Band &amp; Borborbor</h3>
                <p className="text-xs text-gray-500 font-normal">Live football &amp; children's park</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CARDS & MENU PREVIEW (Reference Layout - Asymmetrical 3 Columns) */}
      <section className="bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Card 1 (Left): Top-Down Food Dish Card */}
            <div className="lg:col-span-4 flex flex-col group">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md bg-gray-900">
                <Image
                  src="/images/ref_topdown_dish.jpg"
                  alt={featuredDish1.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#F25C05] text-white text-[10px] font-bold uppercase tracking-wider">
                  Top Seller
                </div>
              </div>
              <div className="pt-4 space-y-1">
                <h3 className="text-lg font-serif font-bold text-gray-950 group-hover:text-[#F25C05] transition-colors">
                  {featuredDish1.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-normal line-clamp-2">
                  {featuredDish1.description}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-base font-bold text-[#F25C05]">
                    GH₵ {featuredDish1.price}.00
                  </span>
                  <button
                    onClick={(e) => handleQuickAdd(featuredDish1, e)}
                    className="px-3.5 py-1.5 rounded-md bg-[#F25C05] hover:bg-[#D94E00] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 (Center): Fresh Banku & Whole Grilled Tilapia Card */}
            <div className="lg:col-span-4 flex flex-col group">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md bg-gray-900">
                <Image
                  src="/images/banku_tilapia.jpg"
                  alt={featuredDish2.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0C271F] text-white text-[10px] font-bold uppercase tracking-wider">
                  Fresh Catch
                </div>
              </div>
              <div className="pt-4 space-y-1">
                <h3 className="text-lg font-serif font-bold text-gray-950 group-hover:text-[#F25C05] transition-colors">
                  {featuredDish2.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-normal line-clamp-2">
                  {featuredDish2.description}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-base font-bold text-[#F25C05]">
                    GH₵ {featuredDish2.price}.00
                  </span>
                  <button
                    onClick={(e) => handleQuickAdd(featuredDish2, e)}
                    className="px-3.5 py-1.5 rounded-md bg-[#F25C05] hover:bg-[#D94E00] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* Column 3 (Right): Menu Preview Accordion */}
            <div className="lg:col-span-4 space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#F25C05]">
                  Authentic Selection
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950 mt-1">
                  Menu Preview
                </h2>
              </div>

              {/* Menu Categories Accordion List */}
              <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
                {menuPreviewCategories.map((cat, idx) => {
                  const isExpanded = expandedPreview === idx;
                  return (
                    <div key={cat.id} className="py-3.5">
                      <button
                        onClick={() => setExpandedPreview(isExpanded ? -1 : idx)}
                        className="w-full flex items-start justify-between text-left group cursor-pointer"
                      >
                        <div>
                          <h3 className="text-sm font-bold text-[#F25C05] group-hover:text-[#D94E00] transition-colors">
                            {cat.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 font-normal">
                            {cat.subtitle}
                          </p>
                        </div>
                        <div className="text-[#F25C05] ml-2 shrink-0 pt-0.5">
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </div>
                      </button>

                      {/* Expanded Dish Items with direct Add buttons */}
                      {isExpanded && (
                        <div className="mt-3 pl-2 space-y-2.5 pt-2 border-t border-dashed border-gray-200 animate-in fade-in duration-200">
                          {cat.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-xs">
                              <div>
                                <span className="font-semibold text-gray-800">{item.name}</span>
                                <span className="text-gray-400 block text-[11px]">GH₵ {item.price}.00</span>
                              </div>
                              <button
                                onClick={(e) => handleQuickAdd(item, e)}
                                className="px-2.5 py-1 rounded bg-[#F25C05]/10 hover:bg-[#F25C05] text-[#F25C05] hover:text-white font-bold text-[11px] transition-all cursor-pointer"
                              >
                                + Add
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Full Menu Link */}
              <div className="pt-2">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F25C05] hover:text-[#D94E00] transition-colors"
                >
                  <span>Explore Complete Restaurant Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EVENT SPACES & UNIQUE ATTRACTIONS (All Flyer Services Highlighted) */}
      <section className="bg-gray-50 text-gray-900 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#F25C05]">
              Private Celebrations &amp; Recreation
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-950 mt-1">
              The Event Spaces &amp; Experiences
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 font-normal">
              Explore our fully air-conditioned banquet hall, breezy garden terrace, children’s play park, and weekend entertainment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Space 1: The Grand Banquet Hall */}
            <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full bg-gray-900">
                  <Image
                    src="/images/event_hall.jpg"
                    alt="The Grand Banquet Hall at Vee's Bite"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0C271F] text-white text-[10px] font-bold uppercase">
                    150 – 250 Guests
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-base text-gray-950">
                    The Grand Banquet Hall
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Full climate AC, gold chiavari chairs, stage lighting, surround PA sound, and private VIP bridal dressing suite for weddings, funerals &amp; galas.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  href="/events"
                  className="text-xs font-bold text-[#F25C05] hover:underline flex items-center gap-1"
                >
                  Book Banquet Hall →
                </Link>
              </div>
            </div>

            {/* Space 2: Garden Terrace & Pergola */}
            <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full bg-gray-900">
                  <Image
                    src="/images/garden_terrace.jpg"
                    alt="Garden Terrace and Pergola at Vee's Bite"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0C271F] text-white text-[10px] font-bold uppercase">
                    80 – 150 Guests
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-base text-gray-950">
                    Garden Terrace &amp; Pergola
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Lush manicured tropical lawn, rustic timber pergola with fairy lights, and open-air garden bar for evening dinners and cocktail receptions.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  href="/events"
                  className="text-xs font-bold text-[#F25C05] hover:underline flex items-center gap-1"
                >
                  Book Garden Terrace →
                </Link>
              </div>
            </div>

            {/* Feature 3: Children's Playing Ground */}
            <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full bg-[#0C271F] flex items-center justify-center text-center p-6 text-white">
                  <div>
                    <Smile className="w-12 h-12 text-[#F25C05] mx-auto mb-2" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">Family Fun Park</span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-base text-gray-950">
                    Children's Playing Ground
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    A safe, dedicated playground area with bouncy castles and recreational games so kids have fun while parents enjoy their meals.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  href="/events"
                  className="text-xs font-bold text-[#F25C05] hover:underline flex items-center gap-1"
                >
                  Plan Kids' Party →
                </Link>
              </div>
            </div>

            {/* Feature 4: Live Band, Borborbor & Football */}
            <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full bg-[#081B15] flex items-center justify-center text-center p-6 text-white">
                  <div>
                    <Music className="w-12 h-12 text-[#F25C05] mx-auto mb-2" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">Live Culture &amp; Sports</span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-base text-gray-950">
                    Live Band, Borborbor &amp; Football
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Experience vibrant weekend Borborbor cultural drumming, highlife live bands, and live football match screenings on big screens.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Link
                  href="/contact"
                  className="text-xs font-bold text-[#F25C05] hover:underline flex items-center gap-1"
                >
                  Check Weekend Schedule →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT VEE'S BITE: OUR STORY & PRINCIPLES */}
      <section className="bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-[440px] w-full rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                <Image
                  src="/images/hero.jpg"
                  alt="Inside Vee's Bite Restaurant & Events Estate"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-white">
                  <span className="text-[11px] font-bold text-[#F25C05] uppercase tracking-wider block">
                    Tema, Ghana
                  </span>
                  <p className="text-xs text-gray-200 mt-0.5">
                    Where great conversation meets delicious Ghanaian culinary hospitality.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Story & Principles */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#F25C05]">
                  Our Story &amp; Heritage
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-950 mt-1">
                  Born from a Passion for Flavor, Celebration &amp; Community
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                  Vee’s Bite &amp; Events Center was established with a singular vision: to create a welcoming sanctuary where residents and visitors of Tema can enjoy rich, authentic Ghanaian cuisine in a relaxed, beautifully styled setting.
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  We realized that Tema deserved more than just another eatery. People needed a venue that seamlessly combines daily dining excellence with an upscale, multi-purpose events space capable of hosting weddings, birthday celebrations, corporate conferences, and private banquets under one roof.
                </p>
              </div>

              {/* 4 Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-full bg-[#F25C05]/15 flex items-center justify-center text-[#F25C05] shrink-0 font-bold">
                      <Flame className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-gray-900">Soulful Ghanaian Recipes</h4>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Slow-simmered sauces, authentic local spices, and traditional methods passed down through generations.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-full bg-[#F25C05]/15 flex items-center justify-center text-[#F25C05] shrink-0 font-bold">
                      <UtensilsCrossed className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-gray-900">Tema Fresh Ingredients</h4>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Whole tilapia, fresh vegetables, plantains, and aromatic herbs sourced daily for maximum flavor.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-full bg-[#F25C05]/15 flex items-center justify-center text-[#F25C05] shrink-0 font-bold">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-gray-900">Uncompromising Hygiene</h4>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Rigorous food safety, sanitized prep stations, and immaculate dining &amp; banquet halls.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-full bg-[#F25C05]/15 flex items-center justify-center text-[#F25C05] shrink-0 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-gray-900">True Akwaaba Hospitality</h4>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Warm and attentive care for every patron, whether you order a single meal or a 250-seat wedding.
                  </p>
                </div>
              </div>

              {/* Rating & Link */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>4.4 / 5.0 (Google Reviews)</span>
                  </div>
                  <span className="text-xs text-gray-500">Tema Diners' Choice</span>
                </div>

                <Link
                  href="/about"
                  className="text-xs font-bold text-[#F25C05] hover:underline flex items-center gap-1"
                >
                  Read Our Full Story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DARK GREEN FLOATING RIBBON / SERVICE STRIP (Reference Design) */}
      <section className="bg-gray-50 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto rounded-2xl sm:rounded-full bg-[#0C271F] border border-[#143B30] p-3 sm:px-8 sm:py-3.5 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-medium text-emerald-100 flex-wrap">
            <span className="flex items-center gap-1.5">
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#F25C05]" />
              Dine-in &amp; Fast Delivery
            </span>
            <span className="hidden sm:inline text-emerald-700">•</span>
            <span className="hidden sm:inline flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#F25C05]" />
              Grand Hall (250 Guests)
            </span>
            <span className="hidden sm:inline text-emerald-700">•</span>
            <span className="hidden sm:inline flex items-center gap-1.5">
              <Trees className="w-3.5 h-3.5 text-[#F25C05]" />
              Garden Pergola (150 Guests)
            </span>
            <span className="hidden md:inline text-emerald-700">•</span>
            <span className="hidden md:inline flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-[#F25C05]" />
              Live Band &amp; Borborbor
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/events"
              className="px-5 py-2 rounded-full bg-[#F25C05] hover:bg-[#D94E00] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              Book Event Space
            </Link>
            <a
              href="tel:+233264449211"
              className="text-xs text-emerald-200 hover:text-white flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#F25C05]" />
              <span>0264 449 211</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. DARK LOWER SECTION: RESERVATIONS & FEATURE CARDS (Reference Design) */}
      <section className="bg-[#091612] border-t border-[#12362B] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Card: Jumbo Grilled Prawns / Seafood Dish */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden border border-[#164938] shadow-2xl bg-black">
                <Image
                  src="/images/ref_prawns_dish.jpg"
                  alt="Vee's Fresh Grilled Prawns & Seafood"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold text-[#F25C05] uppercase tracking-wider">Chef's Special</div>
                  <div className="text-sm font-serif font-bold">Grilled Tiger Prawns &amp; Fish</div>
                  <p className="text-[11px] text-gray-300 mt-0.5">Atlantic prawns sautéed in garlic-ginger butter.</p>
                </div>
              </div>
            </div>

            {/* Center Area: Complete Reservation & Event Booking Form */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-center sm:text-left">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#F25C05]">
                  Fast Reservations
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-1">
                  Reserve a Table or Event Venue
                </h2>
                <p className="text-xs text-emerald-100/70 mt-2 font-normal leading-relaxed">
                  Book your dining table or inquire about our air-conditioned Grand Banquet Hall, Garden Terrace, or Children’s Playing Ground.
                </p>
              </div>

              {resSuccess ? (
                <div className="p-6 rounded-xl bg-[#0C271F] border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h3 className="text-base font-bold text-white">Reservation Request Received!</h3>
                  <p className="text-xs text-emerald-100/80">
                    Our team will contact you promptly at your phone number to confirm your reservation.
                  </p>
                  <a
                    href="https://wa.me/233264449211?text=Hello%20Vee's%20Bite,%20I%20just%20submitted%20a%20reservation%20on%20your%20website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Open WhatsApp Chat
                  </a>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-emerald-200/80 font-medium block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        value={resName}
                        onChange={(e) => setResName(e.target.value)}
                        placeholder="e.g. Kwame Mensah"
                        required
                        className="w-full px-4 py-2.5 rounded-md bg-[#0C271F] border border-[#164938] text-white text-xs placeholder-emerald-100/40 focus:outline-none focus:border-[#F25C05] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-emerald-200/80 font-medium block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={resPhone}
                        onChange={(e) => setResPhone(e.target.value)}
                        placeholder="e.g. 0264 449 211 / 0559 414 013"
                        required
                        className="w-full px-4 py-2.5 rounded-md bg-[#0C271F] border border-[#164938] text-white text-xs placeholder-emerald-100/40 focus:outline-none focus:border-[#F25C05] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-emerald-200/80 font-medium block mb-1">Event / Service Type</label>
                      <select
                        value={resType}
                        onChange={(e) => setResType(e.target.value as EventType)}
                        className="w-full px-3 py-2.5 rounded-md bg-[#0C271F] border border-[#164938] text-white text-xs focus:outline-none focus:border-[#F25C05] cursor-pointer"
                      >
                        <option value="WEDDING">Wedding &amp; Reception</option>
                        <option value="RECEPTION">Reception / Naming</option>
                        <option value="BIRTHDAY">Birthday Celebration</option>
                        <option value="FUNERAL">Funeral Reception</option>
                        <option value="CORPORATE">Corporate Conference / AGM</option>
                        <option value="LIVE_FOOTBALL">Live Football Match Party</option>
                        <option value="PARTY">Dinner &amp; Social Gathering</option>
                        <option value="OTHER">Dining Table Reservation</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-emerald-200/80 font-medium block mb-1">Venue Space</label>
                      <select
                        value={resSpace}
                        onChange={(e) => setResSpace(e.target.value as EventSpace)}
                        className="w-full px-3 py-2.5 rounded-md bg-[#0C271F] border border-[#164938] text-white text-xs focus:outline-none focus:border-[#F25C05] cursor-pointer"
                      >
                        <option value="MAIN_HALL">The Grand Banquet Hall (AC)</option>
                        <option value="GARDEN_TERRACE">Garden Terrace &amp; Pergola</option>
                        <option value="CHILDREN_GROUND">Children’s Playing Ground</option>
                        <option value="VIP_LOUNGE">VIP Dining Lounge</option>
                        <option value="FULL_VENUE">Full Estate Compound</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-emerald-200/80 font-medium block mb-1">Catering Preference</label>
                      <select
                        value={resCatering}
                        onChange={(e) => setResCatering(e.target.value as CateringPreference)}
                        className="w-full px-3 py-2.5 rounded-md bg-[#0C271F] border border-[#164938] text-white text-xs focus:outline-none focus:border-[#F25C05] cursor-pointer"
                      >
                        <option value="BUFFET">Full Buffet Catering</option>
                        <option value="PLATED">Multi-Course Plated Dinner</option>
                        <option value="FINGER_FOODS">Pastries, Popcorn &amp; Finger Foods</option>
                        <option value="EXTERNAL">Drinks &amp; Venue Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-emerald-200/80 font-medium block mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        value={resDate}
                        onChange={(e) => setResDate(e.target.value)}
                        required
                        className="w-full px-3 py-2.5 rounded-md bg-[#0C271F] border border-[#164938] text-white text-xs focus:outline-none focus:border-[#F25C05] cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-emerald-200/80 font-medium block mb-1">Estimated Guests</label>
                      <select
                        value={resGuests}
                        onChange={(e) => setResGuests(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-md bg-[#0C271F] border border-[#164938] text-white text-xs focus:outline-none focus:border-[#F25C05] cursor-pointer"
                      >
                        <option value="2">2 – 4 Guests (Dining Table)</option>
                        <option value="10">5 – 15 Guests (Family Dinner)</option>
                        <option value="50">30 – 50 Guests (Intimate Gathering)</option>
                        <option value="100">80 – 120 Guests (Garden Pergola)</option>
                        <option value="200">150 – 250 Guests (Grand Hall)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={resNotes}
                      onChange={(e) => setResNotes(e.target.value)}
                      placeholder="Special requests (e.g. Live band setup, cake table, special dishes)"
                      className="w-full px-4 py-2.5 rounded-md bg-[#0C271F] border border-[#164938] text-white text-xs placeholder-emerald-100/40 focus:outline-none focus:border-[#F25C05] transition-colors"
                    />
                  </div>

                  {/* Orange Submit Button (Reference Design) */}
                  <button
                    type="submit"
                    disabled={resSubmitting}
                    className="w-full py-3.5 rounded-md bg-[#F25C05] hover:bg-[#D94E00] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    {resSubmitting ? "Submitting Booking..." : "Reserve Now"}
                  </button>
                </form>
              )}
            </div>

            {/* Right Card: Jollof & Chicken / Dish in Dark Frame */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden border border-[#164938] shadow-2xl bg-black">
                <Image
                  src="/images/jollof_chicken.jpg"
                  alt="Vee's Signature Ghanaian Jollof"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold text-[#F25C05] uppercase tracking-wider">Heritage Dish</div>
                  <div className="text-sm font-serif font-bold">Smoky Jollof &amp; Grilled Chicken</div>
                  <p className="text-[11px] text-gray-300 mt-0.5">Slow-cooked basmati with aromatic plum reduction.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS & TRUST (Matching Dark Theme Aesthetics) */}
      <section className="bg-[#071712] py-16 px-4 sm:px-6 lg:px-8 border-t border-[#12362B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#F25C05]">
              Real Guest Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Loved by Diners &amp; Event Organizers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0C271F] border border-[#164938] space-y-4">
              <div className="flex items-center gap-1 text-[#F25C05]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed italic">
                "We celebrated our wedding reception in the Grand Banquet Hall with 180 guests. The AC was super chilled, the sound system was crisp, and the Jollof and grilled chicken had everyone singing praises."
              </p>
              <div className="pt-2 border-t border-[#164938]">
                <div className="text-xs font-bold text-white">Nana &amp; Akosua A.</div>
                <div className="text-[11px] text-[#F25C05]">Wedding Reception • The Grand Hall</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C271F] border border-[#164938] space-y-4">
              <div className="flex items-center gap-1 text-[#F25C05]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed italic">
                "Without exaggeration, the best Banku and Tilapia in Tema! The fish is seasoned to perfection, hot off the coals, and the freshly grounded red pepper gives the authentic local kick. Truly unbeatable."
              </p>
              <div className="pt-2 border-t border-[#164938]">
                <div className="text-xs font-bold text-white">Kwame Mensah</div>
                <div className="text-[11px] text-[#F25C05]">Afienya Resident &amp; Loyal Patron</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C271F] border border-[#164938] space-y-4">
              <div className="flex items-center gap-1 text-[#F25C05]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed italic">
                "The Live Band and Borborbor evening under the fairy-lit pergola was an unforgettable experience. Great food, cold Sobolo, delicious meat pies, and a safe playing ground for the children!"
              </p>
              <div className="pt-2 border-t border-[#164938]">
                <div className="text-xs font-bold text-white">Linda O.</div>
                <div className="text-[11px] text-[#F25C05]">Family &amp; Corporate Gathering Organizer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. VISIT & CONTACT STRIP */}
      <section className="bg-[#05120E] py-12 px-4 sm:px-6 lg:px-8 border-t border-[#0F362A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#0C271F] border border-[#164938] flex items-center justify-center text-[#F25C05] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Location</h4>
              <p className="text-xs text-emerald-100/70 mt-0.5">Afienya Mataheko, Hallelujah, Tema</p>
              <a
                href="https://maps.google.com/?q=Afienya+Mataheko,Tema,Ghana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#F25C05] font-semibold hover:underline inline-block mt-0.5"
              >
                View on Google Maps →
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#0C271F] border border-[#164938] flex items-center justify-center text-[#F25C05] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Hours of Operation</h4>
              <p className="text-xs text-emerald-100/70 mt-0.5">Monday – Sunday</p>
              <p className="text-xs text-[#F25C05] font-semibold">10:35 AM – 10:00 PM Daily</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#0C271F] border border-[#164938] flex items-center justify-center text-[#F25C05] shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Contacts</h4>
              <p className="text-xs text-emerald-100/70 mt-0.5">Fast delivery &amp; table/hall reservations</p>
              <a href="tel:+233264449211" className="text-xs text-[#F25C05] font-bold hover:underline block">
                0264 449 211 / 0559 414 013
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
