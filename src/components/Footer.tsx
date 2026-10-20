import React from "react";
import Link from "next/link";
import { 
  UtensilsCrossed, 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  Calendar,
  Sparkles
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border/60 bg-brand-darker text-gray-300">
      {/* Top Banner / Callout */}
      <div className="bg-gradient-to-r from-brand-surface to-brand-dark border-b border-brand-border/40 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Tema's Top Rated Dining & Celebrations
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Planning a Gathering or Craving Gourmet Ghanaian Food?
            </h3>
            <p className="text-sm text-gray-400 mt-1 max-w-xl">
              Enjoy freshly prepared authentic meals or reserve our banquet hall and garden terrace for your special milestone.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/menu"
              className="px-5 py-3 rounded-xl gold-btn text-sm font-semibold flex items-center gap-2"
            >
              <UtensilsCrossed className="w-4 h-4" />
              Order Food Now
            </Link>
            <Link
              href="/events"
              className="px-5 py-3 rounded-xl bg-white/5 border border-brand-gold/40 hover:bg-brand-gold/10 text-brand-gold text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book Venue
            </Link>
            <a
              href="https://wa.me/233264449211?text=Hello%20Vee's%20Bite,%20I%20would%20like%20to%20make%20an%20enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Profile */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center text-brand-dark font-bold shadow-glow">
              <UtensilsCrossed className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-white block">
                Vee’s Bite
              </span>
              <span className="text-[10px] tracking-wider uppercase text-brand-gold font-semibold">
                & Events Center • Tema
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            A welcoming destination for delicious local and continental dining, coupled with elegant indoor and outdoor event facilities in the heart of Tema, Ghana.
          </p>
          <div className="flex items-center gap-3 pt-2 text-gray-400">
            <span className="text-xs text-brand-gold font-semibold">Verified Rating:</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              ★ 4.4 / 5.0 (7 Google Reviews)
            </span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-gold pl-2">
            Explore
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/menu" className="hover:text-brand-gold transition-colors">
                Restaurant Menu & Specials
              </Link>
            </li>
            <li>
              <Link href="/order" className="hover:text-brand-gold transition-colors">
                Online Ordering & MoMo
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-brand-gold transition-colors">
                Event Center & Banquet Booking
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-brand-gold transition-colors">
                Photo Gallery & Virtual Tour
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand-gold transition-colors">
                About Our Story & Standards
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-gold transition-colors">
                Contact & Directions
              </Link>
            </li>
          </ul>
        </div>

        {/* Business Hours & Location */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-gold pl-2">
            Visit & Hours
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2.5 text-gray-300">
              <MapPin className="w-4 h-4 text-brand-gold mt-1 shrink-0" />
              <span>
                <strong>Afienya Mataheko, Hallelujah</strong>, Tema, Greater Accra, Ghana
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-gray-300">
              <Clock className="w-4 h-4 text-brand-gold mt-1 shrink-0" />
              <div>
                <span className="font-medium text-white block">Opening Hours:</span>
                <span className="text-gray-400">Daily: ~10:35 AM – 10:00 PM</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-gray-300">
              <Phone className="w-4 h-4 text-brand-gold mt-1 shrink-0" />
              <div>
                <a href="tel:+233264449211" className="text-brand-gold font-medium hover:underline block">
                  0264 449 211
                </a>
                <a href="tel:+233559414013" className="text-brand-gold font-medium hover:underline block mt-0.5">
                  0559 414 013
                </a>
                <span className="text-xs text-gray-400 block mt-0.5">Orders &amp; Venue Consultations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Manager Portal */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-gold pl-2">
            Payments & Administration
          </h4>
          <p className="text-xs text-gray-400 mb-3">
            We accept all major Ghana payment channels for dining and event deposits:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="px-2.5 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-medium text-center">
              MTN MoMo
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-medium text-center">
              Telecel Cash
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 font-medium text-center">
              AT Money
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium text-center">
              Cash on Delivery
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-brand-border/40">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-gold transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Owner & Staff Admin Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright + Social */}
      <div className="border-t border-brand-border/40 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Vee&apos;s Bite &amp; Events Center. All rights reserved. Afienya Mataheko, Hallelujah, Tema.</p>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/veesbiteevents" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Facebook: vee&apos;s bite &amp; event center</a>
            <span className="text-gray-700">|</span>
            <a href="https://www.instagram.com/vees.bite" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Instagram: @vees.bite</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
