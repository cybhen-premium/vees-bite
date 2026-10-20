"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { INITIAL_MENU_ITEMS } from "@/lib/data-store";
import { MenuItem } from "@/types";
import {
  UtensilsCrossed,
  Calendar,
  Sparkles,
  Flame,
  Star,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  Users,
  Building2,
  Trees,
  ShoppingBag,
  Plus,
  ChevronRight,
  Award,
} from "lucide-react";

export default function HomePage() {
  const { addItem, openCart } = useCart();
  const [activeVenueTab, setActiveVenueTab] = useState<"hall" | "garden">("hall");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Featured signature dishes from data store
  const featuredDishes = INITIAL_MENU_ITEMS.filter((item) =>
    ["dish-1", "dish-2", "dish-3", "dish-7", "dish-4", "dish-8"].includes(item.id)
  );

  const handleQuickAdd = (dish: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(dish, 1);
    setToastMessage(`Added 1x ${dish.name} to basket!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const venues = {
    hall: {
      name: "The Grand Banquet Hall",
      subtitle: "Climate-Controlled Luxury for Weddings & Galas",
      capacity: "150 – 250 Guests",
      image: "/images/event_hall.jpg",
      description:
        "Designed to impress with high ceilings, gold fabric drapery, customizable stage lighting, and powerful surround sound. Perfect for grand wedding receptions, corporate dinners, milestone birthdays, and awards nights.",
      highlights: [
        "Full climate-controlled air conditioning",
        "Celebration stage & podium with gold drapery",
        "Dual wireless mics & surround sound PA system",
        "Round banquet tables with gold chiavari chairs",
        "VIP bridal dressing suite & green room",
      ],
      idealFor: ["Weddings", "Corporate Galas", "Milestone 50th/60th Birthdays", "Church Banquets"],
    },
    garden: {
      name: "The Garden Terrace & Pergola",
      subtitle: "Open-Air Magic Under Tema's Evening Sky",
      capacity: "80 – 150 Guests",
      image: "/images/garden_terrace.jpg",
      description:
        "An enchanting outdoor venue enclosed by lush tropical landscaping, manicured lawns, and wooden pergolas laced with warm fairy lights. Feel the evening breeze while sipping chilled Sobolo or cocktails with loved ones.",
      highlights: [
        "Canopy of warm fairy lights & romantic string illumination",
        "Rustic timber pergola and garden cocktail bar",
        "Outdoor acoustic sound setup and DJ power lines",
        "Casual lounge seating and cocktail high-tops",
        "Open-air BBQ grilling station available",
      ],
      idealFor: ["Intimate Weddings", "Cocktail Parties", "Bridal Showers", "Evening Dinners & Networking"],
    },
  };

  const currentVenue = venues[activeVenueTab];

  return (
    <div className="min-h-screen bg-brand-dark text-gray-100 flex flex-col selection:bg-brand-gold selection:text-brand-dark overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-surface border border-brand-gold/60 text-white px-5 py-3.5 rounded-2xl shadow-glow shadow-black/80 animate-bounce transition-all">
          <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-gold">Item Added to Basket</p>
            <p className="text-sm font-medium text-gray-200">{toastMessage}</p>
          </div>
          <button
            onClick={() => {
              setToastMessage(null);
              openCart();
            }}
            className="ml-3 px-3 py-1.5 rounded-xl bg-brand-gold text-brand-dark text-xs font-bold hover:brightness-110 transition-transform"
          >
            View Cart
          </button>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-brand-border/40">
        {/* Background Backdrop Image with Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Vee's Bite Ambiance and Food"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/85 to-brand-dark/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,17,21,0.85)_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs sm:text-sm font-semibold shadow-glow backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                <span>Tema's Premier Dining & Celebrations Center</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                Savor Authentic Flavors.{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-300 to-amber-500">
                  Celebrate Life’s Moments.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Indulge in mouthwatering Ghanaian delicacies—from smoky basmati Jollof and whole charcoal-grilled
                Tilapia to spicy Suya skewers—or host your dream wedding and banquet in our climate-controlled Grand
                Hall & fairy-lit Garden Terrace.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/order"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl gold-btn text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-glow hover:scale-[1.02] transition-transform"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Order Food Online
                </Link>

                <Link
                  href="/events"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-brand-gold/40 hover:bg-brand-gold/10 hover:border-brand-gold text-brand-gold text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all backdrop-blur-md"
                >
                  <Calendar className="w-4 h-4" />
                  Book Event Venue
                </Link>

                <a
                  href="https://wa.me/233264449211?text=Hello%20Vee's%20Bite,%20I%20would%20like%20to%20order%20food%20or%20book%20a%20venue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>

              {/* Trust & Location Badges */}
              <div className="pt-6 border-t border-brand-border/60 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                    <Star className="w-4 h-4 fill-brand-gold" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">4.9 / 5.0</div>
                    <div className="text-[11px] text-gray-400">Tema Diners' Choice</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">10:35 AM – 10 PM</div>
                    <div className="text-[11px] text-gray-400">Open 7 Days a Week</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="w-9 h-9 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Afienya Mataheko, Hallelujah, Tema</div>
                    <div className="text-[11px] text-gray-400">Easy Accessibility</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden border border-brand-gold/30 bg-brand-surface/90 shadow-2xl backdrop-blur-xl p-4">
                {/* Image Showcase */}
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden group">
                  <Image
                    src="/images/jollof_chicken.jpg"
                    alt="Signature Ghanaian Jollof"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-gold text-brand-dark text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-brand-dark" />
                    Top Seller
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-lg font-serif font-bold">Vee's Signature Jollof & Grilled Chicken</div>
                    <p className="text-xs text-gray-300 line-clamp-1 mt-0.5">
                      Rich tomato plum reduction, aromatic spices, kelewele, and house shito.
                    </p>
                  </div>
                </div>

                {/* Card Quick Action */}
                <div className="mt-4 flex items-center justify-between px-2 pt-1 pb-1">
                  <div>
                    <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Price</span>
                    <div className="text-2xl font-bold text-brand-gold font-serif">GH₵ 65.00</div>
                  </div>

                  <button
                    onClick={(e) => {
                      const item = INITIAL_MENU_ITEMS.find((d) => d.id === "dish-1");
                      if (item) handleQuickAdd(item, e);
                    }}
                    className="px-5 py-2.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow hover:scale-105 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Quick Add
                  </button>
                </div>

                {/* Sub banner highlighting venue */}
                <div className="mt-3 p-3 rounded-xl bg-brand-darker/80 border border-brand-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-gold/15 flex items-center justify-center text-brand-gold">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Need an Event Space?</div>
                      <div className="text-[11px] text-gray-400">Banquet Hall & Garden Terrace</div>
                    </div>
                  </div>
                  <Link
                    href="/events"
                    className="text-xs font-bold text-brand-gold hover:text-amber-300 flex items-center gap-1"
                  >
                    Explore <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE TWIN PILLARS (DINING & EVENTS) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4" />
            The Vee's Bite Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Two Worlds of Hospitality in One Destination
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-2">
            Whether you are satisfying your craving for Tema’s finest grilled dishes or organizing an unforgettable
            reception for 200 guests, we deliver excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1: Restaurant & Dining */}
          <div className="relative rounded-3xl bg-brand-surface border border-brand-border overflow-hidden hover:border-brand-gold/50 transition-all duration-300 flex flex-col group shadow-xl">
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src="/images/banku_tilapia.jpg"
                alt="Fresh Banku with Whole Grilled Tilapia"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/40 to-transparent" />
              <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-brand-gold/90 backdrop-blur-md flex items-center justify-center text-brand-dark shadow-glow">
                <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">
                  Culinary Excellence
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1 mb-3">
                  Gourmet Ghanaian Dining & Sizzling Grills
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  Experience traditional Ghanaian comfort food elevated with top-grade ingredients. Taste our whole
                  charcoal-grilled tilapia seasoned with aromatic ginger and cloves, rich smoky Jollof, spicy beef suya,
                  and authentic Kelewele.
                </p>

                <ul className="space-y-2.5 text-xs text-gray-300 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>Prepared fresh daily with farm-fresh ingredients</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>Convenient Tema delivery & takeaway pickup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>Dine-in with chilled craft Sobolo & cocktails</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-brand-border/60">
                <Link
                  href="/menu"
                  className="flex-1 py-3.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider text-center shadow-glow"
                >
                  View Full Menu
                </Link>
                <Link
                  href="/order"
                  className="flex-1 py-3.5 rounded-xl bg-white/5 border border-brand-border hover:border-brand-gold/40 text-gray-200 text-xs font-bold uppercase tracking-wider text-center transition-colors"
                >
                  Order Delivery
                </Link>
              </div>
            </div>
          </div>

          {/* Pillar 2: Event Venues & Banqueting */}
          <div className="relative rounded-3xl bg-brand-surface border border-brand-border overflow-hidden hover:border-brand-gold/50 transition-all duration-300 flex flex-col group shadow-xl">
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src="/images/event_hall.jpg"
                alt="Grand Banquet Hall at Vee's Bite"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/40 to-transparent" />
              <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-brand-gold/90 backdrop-blur-md flex items-center justify-center text-brand-dark shadow-glow">
                <Calendar className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">
                  Celebration Venues
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1 mb-3">
                  The Grand Banquet Hall & Garden Terrace
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  From fairytale wedding receptions and golden anniversaries to high-level corporate banquets, our venue
                  offers full air conditioning, gold chiavari chairs, stage lighting, sound systems, and bespoke in-house
                  catering.
                </p>

                <ul className="space-y-2.5 text-xs text-gray-300 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>Indoor Grand Hall (up to 250 guests) with climate AC</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>Outdoor Garden Terrace (up to 150 guests) with fairy lighting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>Full in-house catering (Buffet, Plated, or Finger Foods)</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-brand-border/60">
                <Link
                  href="/events"
                  className="flex-1 py-3.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider text-center shadow-glow"
                >
                  Book Event Venue
                </Link>
                <Link
                  href="/gallery"
                  className="flex-1 py-3.5 rounded-xl bg-white/5 border border-brand-border hover:border-brand-gold/40 text-gray-200 text-xs font-bold uppercase tracking-wider text-center transition-colors"
                >
                  View Photo Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SIGNATURE DISHES */}
      <section className="py-20 bg-brand-surface/40 border-y border-brand-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-2">
                <Flame className="w-3.5 h-3.5" />
                Crowd Favorites & Chef Specials
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Signature Ghanaian Delicacies
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Cooked with passion, traditional herbs, and authentic Ghanaian warmth.
              </p>
            </div>

            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-brand-gold hover:text-amber-300 font-semibold text-sm group"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <div
                key={dish.id}
                className="rounded-3xl bg-brand-surface border border-brand-border/80 overflow-hidden flex flex-col justify-between hover:border-brand-gold/40 hover:shadow-glow transition-all duration-300 group"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={dish.imageUrl}
                      alt={dish.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-80" />

                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {dish.popular && (
                        <span className="px-2.5 py-1 rounded-full bg-brand-gold text-brand-dark text-[11px] font-bold shadow-md">
                          Popular
                        </span>
                      )}
                      {dish.spicy && (
                        <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-white" /> Spicy
                        </span>
                      )}
                    </div>

                    {dish.prepTimeMinutes && (
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-brand-dark/85 backdrop-blur-md border border-brand-border/60 text-gray-300 text-[11px] font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-brand-gold" />
                        <span>{dish.prepTimeMinutes} mins</span>
                      </div>
                    )}
                  </div>

                  {/* Dish Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-serif font-bold text-white group-hover:text-brand-gold transition-colors">
                        {dish.name}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-brand-border/40">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Price</span>
                    <div className="text-xl font-serif font-bold text-brand-gold">
                      GH₵ {dish.price.toFixed(2)}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(dish, e)}
                    className="px-4 py-2.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gold-btn text-sm font-bold uppercase tracking-wider shadow-glow hover:scale-105 transition-transform"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Start Your Order for Delivery or Pickup</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. THE EVENT VENUES INTERACTIVE SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-4 h-4" />
            Tema Event Spaces
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Host Your Milestone in Style
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-2">
            Choose between our air-conditioned Grand Banquet Hall or the breezy Garden Terrace & Pergola.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex p-1.5 rounded-2xl bg-brand-surface border border-brand-border mt-8">
            <button
              onClick={() => setActiveVenueTab("hall")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeVenueTab === "hall"
                  ? "bg-brand-gold text-brand-dark shadow-glow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              The Grand Banquet Hall
            </button>
            <button
              onClick={() => setActiveVenueTab("garden")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeVenueTab === "garden"
                  ? "bg-brand-gold text-brand-dark shadow-glow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Trees className="w-4 h-4" />
              Garden Terrace & Pergola
            </button>
          </div>
        </div>

        {/* Selected Venue Detailed Card */}
        <div className="rounded-3xl bg-brand-surface border border-brand-border overflow-hidden p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Image */}
            <div className="lg:col-span-6 relative h-80 sm:h-[440px] rounded-2xl overflow-hidden border border-brand-border/60">
              <Image
                src={currentVenue.image}
                alt={currentVenue.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1.5 rounded-xl bg-brand-dark/80 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-xs font-bold flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  Capacity: {currentVenue.capacity}
                </span>
                <Link
                  href="/gallery"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-colors"
                >
                  View Gallery
                </Link>
              </div>
            </div>

            {/* Venue Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-gold">
                  {currentVenue.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                  {currentVenue.name}
                </h3>
                <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                  {currentVenue.description}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Included Amenities & Setup:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentVenue.highlights.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal Events */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Ideal For:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentVenue.idealFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-brand-darker border border-brand-border text-xs text-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/events"
                  className="px-7 py-3.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow text-center"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve This Space</span>
                </Link>

                <a
                  href="https://wa.me/233264449211?text=Hello%20Vee's%20Bite,%20I%20would%20like%20to%20inquire%20about%20booking%20the%20event%20venue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-white/5 border border-brand-border hover:border-brand-gold/40 text-gray-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY GUESTS LOVE VEE'S BITE */}
      <section className="py-20 bg-brand-surface/30 border-y border-brand-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              The Standard of Excellence
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Why Diners & Event Planners Choose Vee’s
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-2">
              We take pride in exceptional service, authentic recipes, and memorable occasions in Tema.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border/60 hover:border-brand-gold/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">Authentic Recipes</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Slow-simmered plum tomato bases, fiery house shito, and fragrant herbs passed down through generations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border/60 hover:border-brand-gold/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-4">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">Tema Fresh Catch</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Whole fresh tilapia, succulent chicken, and crisp garden vegetables sourced daily for peak nutrition and flavor.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border/60 hover:border-brand-gold/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">Pristine Hygiene</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Strict food safety standards, sanitized prep stations, and meticulously maintained banquet halls.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border/60 hover:border-brand-gold/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">Akwaaba Hospitality</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Warm and attentive care for every patron, whether you order a single box of Kelewele or a 250-seat wedding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS & SOCIAL PROOF */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 fill-brand-gold" />
            Loved by Tema
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            What Our Guests & Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-brand-surface border border-brand-border flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-brand-gold mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-gold" />
                ))}
              </div>
              <p className="text-sm text-gray-300 italic leading-relaxed mb-6">
                "We celebrated our wedding reception in the Grand Banquet Hall with 180 guests. The AC was super chilled,
                the sound system was crisp, and the Jollof and grilled chicken had everyone singing praises. Vee's made our
                dream day effortless!"
              </p>
            </div>
            <div className="pt-4 border-t border-brand-border/40">
              <div className="font-bold text-white text-sm">Nana & Akosua A.</div>
              <div className="text-xs text-brand-gold">Wedding Reception, The Grand Hall</div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-brand-surface border border-brand-border flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-brand-gold mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-gold" />
                ))}
              </div>
              <p className="text-sm text-gray-300 italic leading-relaxed mb-6">
                "Without exaggeration, this is the best Banku and Tilapia in Tema! The fish was freshly seasoned, hot off
                the coals, and the freshly ground red and green pepper had authentic heat. It has become our family's
                Sunday ritual."
              </p>
            </div>
            <div className="pt-4 border-t border-brand-border/40">
              <div className="font-bold text-white text-sm">Kwame Mensah</div>
              <div className="text-xs text-brand-gold">Frequent Diner & Tema Resident</div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-brand-surface border border-brand-border flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-brand-gold mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-gold" />
                ))}
              </div>
              <p className="text-sm text-gray-300 italic leading-relaxed mb-6">
                "Our logistics firm booked the Garden Terrace for an end-of-year executive cocktail dinner. The fairy lights
                at twilight created an incredible ambiance, and the finger foods and Sobolo were top notch. Highly recommended!"
              </p>
            </div>
            <div className="pt-4 border-t border-brand-border/40">
              <div className="font-bold text-white text-sm">Linda O.</div>
              <div className="text-xs text-brand-gold">Corporate Event Organizer</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VISIT & CONTACT STRIP */}
      <section className="py-16 bg-gradient-to-r from-brand-surface to-brand-darker border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-gold shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Our Location in Tema</h4>
                <p className="text-xs text-gray-400 mt-0.5">Afienya Mataheko, Hallelujah, Tema</p>
                <a
                  href="https://maps.google.com/?q=QX3P+PW8,Tema,Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-gold font-semibold hover:underline mt-1 inline-block"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-gold shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Opening Hours</h4>
                <p className="text-xs text-gray-300 mt-0.5 font-medium">Monday – Sunday</p>
                <p className="text-xs text-brand-gold font-semibold">10:35 AM – 10:00 PM Daily</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-gold shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Direct Contacts</h4>
                <p className="text-xs text-gray-400 mt-0.5">Call or WhatsApp us for instant bookings</p>
                <a
                  href="tel:+233264449211"
                  className="text-xs text-brand-gold font-semibold hover:underline mt-1 inline-block"
                >
                  0264 449 211
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. GRAND CALL TO ACTION */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-brand-surface via-brand-darker to-black border border-brand-gold/30 p-8 sm:p-14 text-center relative shadow-2xl overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider inline-block">
              Experience Vee’s Bite Today
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Ready for an Unforgettable Dining or Celebration Experience?
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Order fresh food online for swift delivery to your doorstep in Tema, or get in touch with our event
              management team to reserve your date for the Grand Hall or Garden Terrace.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/order"
                className="w-full sm:w-auto px-8 py-4 rounded-xl gold-btn text-sm font-bold uppercase tracking-wider shadow-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Food Online</span>
              </Link>

              <Link
                href="/events"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-brand-gold/40 hover:bg-brand-gold/10 text-brand-gold text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Event Space</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
