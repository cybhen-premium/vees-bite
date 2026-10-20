import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  HeartHandshake, 
  UtensilsCrossed, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Flame, 
  Calendar
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Soulful Ghanaian Recipes",
      desc: "We honor the true taste of West Africa with slow-simmered sauces, authentic local spices, and traditional methods passed down through generations.",
      icon: Flame,
    },
    {
      title: "Tema Fresh Ingredients",
      desc: "Our whole tilapia, fresh vegetables, plantains, and aromatic herbs are sourced daily to ensure maximum flavor, crispness, and nutrition.",
      icon: UtensilsCrossed,
    },
    {
      title: "Uncompromising Hygiene",
      desc: "We maintain rigorous food safety, pristine preparation stations, and immaculate dining halls so every guest eats and celebrates with peace of mind.",
      icon: ShieldCheck,
    },
    {
      title: "True Akwaaba Hospitality",
      desc: "Every guest at Vee’s is family. Whether it's a quick lunch takeaway or a 200-guest wedding, we treat each occasion with utmost warmth and care.",
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" />
            Our Story & Heritage
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            About Vee’s Bite & Events Center
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            Crafting memorable meals and unforgettable occasions in the heart of Tema, Ghana.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-80 sm:h-[460px] rounded-3xl overflow-hidden border border-brand-border shadow-2xl">
            <Image
              src="/images/hero.jpg"
              alt="Inside Vee's Bite Dining Space"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-brand-gold/30">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                Tema, Ghana
              </span>
              <p className="text-xs text-gray-300 mt-1">
                Where great conversation meets delicious Ghanaian culinary hospitality.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-snug">
              Born from a Passion for Flavor, Celebration, and Community
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed">
              Vee’s Bite & Events Center was established with a singular vision: to create a welcoming sanctuary where residents and visitors of Tema can enjoy rich, authentic Ghanaian cuisine in a relaxed, beautifully styled setting.
            </p>

            <p className="text-sm text-gray-300 leading-relaxed">
              We realized that Tema deserved more than just another eatery. People needed a venue that seamlessly combines daily dining excellence with an upscale, multi-purpose events space capable of hosting weddings, birthday celebrations, corporate conferences, and private banquets under one roof.
            </p>

            <div className="p-4 rounded-2xl bg-brand-surface border border-brand-border flex items-center gap-4">
              <div className="p-3 rounded-xl bg-brand-gold/10 text-brand-gold shrink-0">
                <Star className="w-6 h-6 fill-brand-gold" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-base">
                  4.4 / 5.0 Customer Rating
                </h4>
                <p className="text-xs text-gray-400">
                  Backed by verified Google reviews from satisfied patrons and event hosts across Tema and Greater Accra.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-2">
              Our Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              What Sets Vee’s Bite Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-brand-surface border border-brand-border/80 hover:border-brand-gold/40 transition-all flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-4 border border-brand-gold/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-white mb-2">
                      {v.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dual Pillar: Restaurant + Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-brand-surface border border-brand-border flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center text-brand-dark mb-4 font-bold">
                <UtensilsCrossed className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-white mb-2">
                The Restaurant & Kitchen
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Open daily from 10:35 AM to 10:00 PM for dine-in, takeaway, and reliable delivery across Tema, Ashaiman, and Spintex. From our signature party Jollof to charcoal-grilled fish and chilled Sobolo, our kitchen works all day to deliver quality you can taste.
              </p>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-wider hover:underline"
            >
              Browse Restaurant Menu →
            </Link>
          </div>

          <div className="p-8 rounded-3xl bg-brand-surface border border-brand-border flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center text-brand-dark mb-4 font-bold">
                <Calendar className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-white mb-2">
                The Events Center
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Featuring our 250-capacity Grand Banquet Hall and romantic 80-capacity open-air Garden Terrace. Equipped with high-powered sound, air conditioning, stage lighting, and custom catering packages for weddings, birthdays, and corporate events.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-wider hover:underline"
            >
              Explore Event Packages →
            </Link>
          </div>
        </div>

        {/* Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-surface to-brand-darker border border-brand-gold/30 text-center">
          <h3 className="font-serif font-bold text-2xl text-white mb-2">
            Come Dine or Plan with Us Today
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto mb-6">
            Located at Afienya Mataheko, Hallelujah, Tema. Our doors are open daily, and our event consultants are ready to assist with your next booking.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/order"
              className="px-6 py-3.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider"
            >
              Order Online
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-white/5 border border-brand-border text-white hover:border-brand-gold text-xs font-bold uppercase tracking-wider"
            >
              Get Location & Directions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
