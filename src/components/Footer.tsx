"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  Send,
  Calendar,
  UtensilsCrossed
} from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#081E17] border-t border-[#0F362A] text-emerald-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#123E30]">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-md border-2 border-emerald-400/20 bg-[#0a192f]">
                <Image
                  src="/logo.png"
                  alt="Vee's Bite & Events Center Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Vee’s Bite
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#F25C05]">
                  &amp; Events Center • Tema
                </span>
              </div>
            </Link>

            <p className="text-sm text-emerald-100/70 leading-relaxed font-light">
              Tema’s premier destination for authentic Ghanaian cuisine, charcoal grills, whole tilapia, and unforgettable private events at Afienya Mataheko, Hallelujah.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com/veesbiteandeventcenter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#0E3125] border border-[#164938] flex items-center justify-center text-emerald-200 hover:text-white hover:bg-[#F25C05] hover:border-[#F25C05] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/vees.bite"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#0E3125] border border-[#164938] flex items-center justify-center text-emerald-200 hover:text-white hover:bg-[#F25C05] hover:border-[#F25C05] transition-all"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/veesbiteandeventcenter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-[#0E3125] border border-[#164938] flex items-center justify-center text-emerald-200 hover:text-white hover:bg-[#F25C05] hover:border-[#F25C05] transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/233264449211?text=Hello%20Vee's%20Bite"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-[#0E3125] border border-[#164938] flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-600 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition-colors">Restaurant Menu</Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-white transition-colors">Order Online</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">Event Spaces</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">Photo Gallery</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Location & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              Hours &amp; Location
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F25C05] shrink-0 mt-0.5" />
                <span>Afienya Mataheko, Hallelujah, Tema, Ghana</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F25C05] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Monday – Sunday</div>
                  <div className="text-emerald-300">10:35 AM – 10:00 PM Daily</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#F25C05] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+233264449211" className="hover:text-white block">0264 449 211</a>
                  <a href="tel:+233559414013" className="hover:text-white block">0559 414 013</a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter / Updates (3 cols) - matching reference design */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Stay Connected
            </h4>
            <p className="text-xs text-emerald-100/70 font-light leading-relaxed">
              Receive updates on weekend chef specials, live band nights, and holiday celebrations.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center rounded-md bg-[#0C271F] border border-[#164938] overflow-hidden p-1">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-transparent px-3 py-2 text-xs text-white placeholder-emerald-200/40 focus:outline-none w-full"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#F25C05] hover:bg-[#D94E00] text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-medium">
                  ✓ Thank you for subscribing to Vee’s Bite!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/60">
          <p>© {new Date().getFullYear()} Vee’s Bite &amp; Events Center. All rights reserved. Tema, Ghana.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">Our Story</Link>
            <Link href="/events" className="hover:text-white transition-colors">Bookings</Link>
            <Link href="/admin" className="hover:text-[#F25C05] transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
