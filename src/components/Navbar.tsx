"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Calendar, 
  UtensilsCrossed, 
  ShieldCheck,
  MapPin
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, toggleCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Order Online", href: "/order" },
    { name: "Events & Venue", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-border/60 bg-brand-dark/85 backdrop-blur-md transition-all">
      {/* Top Banner Notice */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 text-xs bg-brand-darker border-b border-brand-border/30 text-gray-400">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-brand-gold">
            <MapPin className="w-3.5 h-3.5 text-brand-gold" />
            Afienya Mataheko, Hallelujah, Tema
          </span>
          <span className="text-gray-400">Open Daily: 10:35 AM – 10:00 PM</span>
        </div>
        <div className="flex items-center gap-5">
          <a 
            href="tel:+233264449211" 
            className="flex items-center gap-1 text-gray-300 hover:text-brand-gold transition-colors"
          >
            <Phone className="w-3 h-3 text-brand-gold" />
            Call: 0264 449 211
          </a>
          <Link 
            href="/admin" 
            className="flex items-center gap-1 text-gray-400 hover:text-brand-gold transition-colors"
          >
            <ShieldCheck className="w-3 h-3" />
            Admin Portal
          </Link>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-gold to-brand-600 flex items-center justify-center text-brand-dark shadow-glow group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-brand-gold transition-colors">
              Vee’s Bite
            </div>
            <div className="text-[10px] tracking-widest uppercase font-semibold text-brand-gold/90">
              & Events Center • Tema
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-brand-gold bg-white/5 border border-brand-gold/20 font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons: Booking, Cart, Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/events"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <Calendar className="w-4 h-4" />
            Book Venue
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={toggleCart}
            id="cart-toggle-btn"
            aria-label="Open Shopping Cart"
            className="relative p-2.5 rounded-xl bg-brand-surface border border-brand-border hover:border-brand-gold text-white hover:text-brand-gold transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-brand-gold text-brand-dark text-xs font-bold flex items-center justify-center shadow-glow animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2.5 rounded-xl bg-brand-surface border border-brand-border text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-brand-border bg-brand-dark/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                  isActive
                    ? "text-brand-gold bg-brand-gold/10 font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-brand-border/60 flex flex-col gap-2.5">
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-brand-gold text-brand-gold font-medium text-sm"
            >
              <Calendar className="w-4 h-4" />
              Book Venue / Events
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 text-xs text-gray-400 hover:text-brand-gold"
            >
              <ShieldCheck className="w-4 h-4" />
              Manager Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
