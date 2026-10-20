"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { INITIAL_MENU_ITEMS } from "@/lib/data-store";
import { MenuItem, MenuCategory } from "@/types";
import { 
  Search, 
  ShoppingBag, 
  Flame, 
  Star, 
  Clock, 
  Info, 
  X, 
  CheckCircle2, 
  Filter,
  Plus,
  Minus
} from "lucide-react";

export default function MenuPage() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalSpecialInstructions, setModalSpecialInstructions] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Items" },
    { id: "local", label: "Local Ghanaian Classics" },
    { id: "mains", label: "Main Meals & Grills" },
    { id: "snacks", label: "Snacks & Small Chops" },
    { id: "drinks", label: "Chilled Drinks & Juices" },
    { id: "specials", label: "Chef's Specials & Platters" },
  ];

  const filteredItems = useMemo(() => {
    return INITIAL_MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpicy = onlySpicy ? item.spicy : true;
      const matchesPopular = onlyPopular ? item.popular : true;

      return matchesCategory && matchesSearch && matchesSpicy && matchesPopular;
    });
  }, [selectedCategory, searchQuery, onlySpicy, onlyPopular]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(item, 1);
    setToastMessage(`Added 1x ${item.name} to basket!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleModalAdd = () => {
    if (!selectedDish) return;
    addItem(selectedDish, modalQuantity, modalSpecialInstructions);
    setToastMessage(`Added ${modalQuantity}x ${selectedDish.name} to basket!`);
    setSelectedDish(null);
    setModalQuantity(1);
    setModalSpecialInstructions("");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-brand-dark py-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-2">
            Freshly Made Daily
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Our Restaurant Menu
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mt-3">
            Explore authentic Ghanaian specialties, aromatic party rice dishes, fresh seafood, and chilled refreshing juices. Prices are in Ghana Cedis (GH₵).
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-4 sm:p-6 mb-10 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jollof, tilapia, waakye, drinks..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Toggle Chips */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setOnlyPopular(!onlyPopular)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  onlyPopular
                    ? "bg-brand-gold text-brand-dark border-brand-gold"
                    : "bg-brand-darker border-brand-border text-gray-300 hover:border-brand-gold/40"
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                Most Popular
              </button>

              <button
                type="button"
                onClick={() => setOnlySpicy(!onlySpicy)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  onlySpicy
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-brand-darker border-brand-border text-gray-300 hover:border-red-500/40"
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                Spicy Dishes
              </button>
            </div>
          </div>

          {/* Categories Tab Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none border-t border-brand-border/40">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as MenuCategory)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-brand-gold text-brand-dark shadow-glow font-bold"
                    : "bg-brand-darker/60 text-gray-300 hover:text-white hover:bg-brand-darker"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-brand-surface rounded-2xl border border-brand-border p-8">
            <Info className="w-10 h-10 text-brand-gold mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-white">No dishes found</h3>
            <p className="text-sm text-gray-400 mt-1 mb-4">
              We couldn't find any items matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setOnlySpicy(false);
                setOnlyPopular(false);
              }}
              className="px-4 py-2 rounded-xl gold-btn text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((dish) => (
              <div
                key={dish.id}
                onClick={() => {
                  setSelectedDish(dish);
                  setModalQuantity(1);
                  setModalSpecialInstructions("");
                }}
                className="group cursor-pointer rounded-2xl bg-brand-surface border border-brand-border/70 hover:border-brand-gold/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div>
                  {/* Dish Thumbnail */}
                  <div className="relative h-52 w-full bg-brand-darker overflow-hidden">
                    <Image
                      src={dish.imageUrl}
                      alt={dish.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {dish.popular && (
                        <span className="px-2.5 py-0.5 rounded-full bg-brand-gold text-brand-dark text-[10px] font-extrabold uppercase shadow-sm">
                          Popular
                        </span>
                      )}
                      {dish.spicy && (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase flex items-center gap-1 shadow-sm">
                          <Flame className="w-3 h-3" /> Spicy
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/85 backdrop-blur-md text-brand-gold font-bold text-base shadow-lg border border-white/10">
                      GH₵ {dish.price}.00
                    </div>
                  </div>

                  {/* Dish Info */}
                  <div className="p-5">
                    <h3 className="font-serif font-bold text-lg text-white group-hover:text-brand-gold transition-colors line-clamp-1">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Footer and Quick Actions */}
                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-brand-border/40 mt-auto">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    ~{dish.prepTimeMinutes} mins
                  </span>

                  <button
                    onClick={(e) => handleQuickAdd(dish, e)}
                    className="px-4 py-2 rounded-xl gold-btn text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Owner's Note Banner */}
        <div className="mt-16 p-6 rounded-2xl bg-brand-darker border border-brand-border text-center text-xs text-gray-400">
          <p className="max-w-xl mx-auto">
            * Dietary & Catering Notice: All dishes are prepared fresh using locally sourced Ghanaian ingredients. If you have specific allergy concerns or wish to customize spice levels, please specify in the notes during checkout or call us at <strong>+233 20 149 6782</strong>.
          </p>
        </div>
      </div>

      {/* Dish Detail Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-brand-surface border border-brand-border text-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-60 w-full shrink-0">
              <Image
                src={selectedDish.imageUrl}
                alt={selectedDish.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                <span className="px-3 py-1 rounded-full bg-brand-gold text-brand-dark font-extrabold text-xs uppercase">
                  {selectedDish.category}
                </span>
                <span className="text-2xl font-bold text-white bg-black/80 px-3 py-1 rounded-xl">
                  GH₵ {selectedDish.price * modalQuantity}.00
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <h3 className="font-serif font-bold text-2xl text-white">
                  {selectedDish.name}
                </h3>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                  {selectedDish.description}
                </p>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Special Instructions / Preparation Notes (Optional):
                </label>
                <textarea
                  value={modalSpecialInstructions}
                  onChange={(e) => setModalSpecialInstructions(e.target.value)}
                  placeholder="e.g. Mild pepper, separate shito, extra onions, pack separately..."
                  rows={2}
                  className="w-full p-3 rounded-xl bg-brand-darker border border-brand-border text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold resize-none"
                />
              </div>

              {/* Quantity Picker & Add Button */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="flex items-center border border-brand-border rounded-xl bg-brand-darker p-1">
                  <button
                    onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-bold text-sm text-white">{modalQuantity}</span>
                  <button
                    onClick={() => setModalQuantity(modalQuantity + 1)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleModalAdd}
                  className="flex-1 py-3.5 rounded-xl gold-btn text-sm font-bold flex items-center justify-center gap-2 shadow-glow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Basket (GH₵ {selectedDish.price * modalQuantity})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
