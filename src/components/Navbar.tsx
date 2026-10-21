"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Calendar, 
  MapPin,
  Clock
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
    <header className="sticky top-0 z-50 w-full bg-[#0C271F] border-b border-[#143B30] text-white">
      {/* Top Info Bar */}
      <div className="hidden lg:block bg-[#081B15] border-b border-[#0E2F25] text-[11px] py-1.5 text-emerald-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-[#F25C05]" />
              Afienya Mataheko, Hallelujah, Tema
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Open Daily: 10:35 AM – 10:00 PM
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a 
              href="tel:+233264449211" 
              className="flex items-center gap-1.5 text-emerald-100 hover:text-[#F25C05] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#F25C05]" />
              0264 449 211 / 0559 414 013
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 shadow-md border-2 border-emerald-400/20 group-hover:border-[#F25C05] transition-all bg-[#0a192f]">
            <Image
              src="/logo.png"
              alt="Vee's Bite & Events Center Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-200 transition-colors">
              Vee’s Bite
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#F25C05]">
              &amp; Events Center • Tema
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all relative ${
                  isActive
                    ? "text-[#F25C05] font-bold"
                    : "text-gray-200 hover:text-white hover:text-[#F25C05]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F25C05] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons: Cart + Orange CTA Button (matching reference) */}
        <div className="flex items-center gap-3">
          {/* Shopping Cart Button */}
          <button
            onClick={toggleCart}
            id="cart-toggle-btn"
            aria-label="View Shopping Cart"
            className="relative p-2.5 rounded-lg bg-[#143B30] hover:bg-[#1C4E40] text-white transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F25C05] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                {totalItems}
              </span>
            )}
          </button>

          {/* Prominent Orange CTA Button (matching reference) */}
          <Link
            href="/order"
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-[#F25C05] hover:bg-[#D94E00] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-[0.98]"
          >
            Order Online
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className="lg:hidden p-2.5 rounded-lg bg-[#143B30] text-white hover:bg-[#1C4E40] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A221B] border-t border-[#143B30] px-4 py-6 space-y-4 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-[#F25C05] text-white"
                      : "text-gray-200 hover:bg-[#143B30] hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#143B30] flex flex-col gap-2.5">
            <Link
              href="/order"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-md bg-[#F25C05] text-white text-xs font-bold uppercase tracking-wider text-center shadow-md"
            >
              Order Online
            </Link>
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-md bg-[#143B30] text-emerald-200 text-xs font-semibold uppercase tracking-wider text-center border border-emerald-400/20"
            >
              Book Event Venue
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
