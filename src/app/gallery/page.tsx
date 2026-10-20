"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  X, 
  Eye, 
  Calendar, 
  UtensilsCrossed, 
  Camera
} from "lucide-react";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activePhoto, setActivePhoto] = useState<any | null>(null);

  const photos = [
    {
      id: "gal-1",
      title: "Signature Ghanaian Jollof & Charcoal Grilled Chicken",
      category: "food",
      categoryLabel: "Food & Drinks",
      src: "/images/jollof_chicken.jpg",
      description: "Authentic party jollof served with kelewele, grilled quarter chicken, and seasoned black shito.",
    },
    {
      id: "gal-2",
      title: "Fresh Steaming Banku with Whole Grilled Tilapia",
      category: "food",
      categoryLabel: "Food & Drinks",
      src: "/images/banku_tilapia.jpg",
      description: "Traditional Tema seafood staple served in an authentic earthenware bowl with freshly ground pepper.",
    },
    {
      id: "gal-3",
      title: "The Grand Banquet Hall Wedding Setup",
      category: "events",
      categoryLabel: "Event Spaces",
      src: "/images/event_hall.jpg",
      description: "Gold ceiling draping, fairy lighting, round banquet tables with gold chargers, and celebration stage.",
    },
    {
      id: "gal-4",
      title: "Twilight Open-Air Garden Terrace",
      category: "events",
      categoryLabel: "Event Spaces",
      src: "/images/garden_terrace.jpg",
      description: "Canopy of warm fairy lights, breezy palms, cocktail bar, and lounge seating for evening celebrations.",
    },
    {
      id: "gal-5",
      title: "Vee's Warm Dining Ambiance & Social Hall",
      category: "interior",
      categoryLabel: "Restaurant Interior",
      src: "/images/hero.jpg",
      description: "Warm amber rattan pendant lighting, brick walls, and comfortable family dining booths in Tema.",
    },
    {
      id: "gal-6",
      title: "Tema Special Waakye Platter on Banana Leaf",
      category: "food",
      categoryLabel: "Food & Drinks",
      src: "/images/waakye.jpg",
      description: "Rice and beans served with fried fish, boiled egg, spaghetti, gari foto, and shito.",
    },
    {
      id: "gal-7",
      title: "House Chilled Spiced Sobolo & Fresh Juices",
      category: "food",
      categoryLabel: "Food & Drinks",
      src: "/images/drinks.jpg",
      description: "Cold-infused ruby hibiscus drink with spicy ginger, fresh mint, and tropical pineapple puree.",
    },
  ];

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "food", label: "Food & Drinks" },
    { id: "events", label: "Event Setups & Hall" },
    { id: "interior", label: "Restaurant Interior" },
  ];

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-brand-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-4 h-4" />
            Visual Experience
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Photo Gallery
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mt-3">
            Get an authentic look at our mouth-watering dishes, cozy restaurant atmosphere, and versatile banquet spaces in Tema, Ghana.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-brand-gold text-brand-dark shadow-glow font-bold"
                  : "bg-brand-surface border border-brand-border text-gray-300 hover:text-white hover:border-brand-gold/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group cursor-pointer rounded-2xl bg-brand-surface border border-brand-border overflow-hidden hover:border-brand-gold/50 transition-all duration-300 shadow-xl relative"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-brand-darker">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-brand-gold text-[10px] font-bold uppercase tracking-wider border border-white/10">
                    {photo.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif font-bold text-base text-white group-hover:text-brand-gold transition-colors line-clamp-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                    {photo.description}
                  </p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <div className="p-3 rounded-full bg-brand-gold text-brand-dark shadow-lg">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-brand-surface border border-brand-border text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="font-serif font-bold text-xl text-white">
              Ready to Experience Vee’s Bite in Person?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visit us in Tema for delicious dining or reserve our venue for your special celebration.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/menu"
              className="px-5 py-3 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <UtensilsCrossed className="w-4 h-4" />
              Order Food
            </Link>
            <Link
              href="/events"
              className="px-5 py-3 rounded-xl bg-white/5 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-brand-gold/10 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book Venue
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full bg-brand-surface rounded-2xl border border-brand-border overflow-hidden shadow-2xl">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-80 sm:h-[500px] w-full">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                className="object-contain bg-black"
              />
            </div>

            <div className="p-6 bg-brand-darker border-t border-brand-border">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block mb-1">
                {activePhoto.categoryLabel}
              </span>
              <h3 className="font-serif font-bold text-xl text-white mb-2">
                {activePhoto.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
