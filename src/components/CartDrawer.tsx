"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Bike, 
  Store,
  MessageCircle
} from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    deliveryType,
    setDeliveryType,
  } = useCart();

  if (!isCartOpen) return null;

  // Build WhatsApp pre-filled text
  const generateWhatsAppMessage = () => {
    const itemsList = items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.menuItem.name} (GH₵ ${i.menuItem.price * i.quantity})${
            i.specialInstructions ? ` [Note: ${i.specialInstructions}]` : ""
          }`
      )
      .join("%0A");

    const message = `Hello Vee's Bite,%0A%0AI would like to place an order:%0A${itemsList}%0A%0AOrder Type: ${deliveryType}%0ASubtotal: GH₵ ${subtotal}%0ADelivery Fee: GH₵ ${deliveryFee}%0ATotal Amount: GH₵ ${total}%0A%0APlease confirm my order!`;
    return `https://wa.me/233201496782?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-surface border-l border-brand-border text-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-brand-border flex items-center justify-between bg-brand-dark">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-gold" />
              <h2 className="text-lg font-serif font-bold text-white">Your Food Basket</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold font-bold">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={closeCart}
              id="close-cart-btn"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery or Pickup Toggle */}
          <div className="p-4 bg-brand-darker border-b border-brand-border/60">
            <div className="grid grid-cols-2 gap-2 bg-brand-surface p-1 rounded-xl border border-brand-border">
              <button
                type="button"
                onClick={() => setDeliveryType("DELIVERY")}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  deliveryType === "DELIVERY"
                    ? "bg-brand-gold text-brand-dark shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Bike className="w-4 h-4" />
                Delivery (+GH₵ 15)
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType("PICKUP")}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  deliveryType === "PICKUP"
                    ? "bg-brand-gold text-brand-dark shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Store className="w-4 h-4" />
                Pickup (Free)
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-brand-gold">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-white mb-1">
                  Your basket is empty
                </h3>
                <p className="text-xs text-gray-400 mb-6">
                  Explore our authentic Ghanaian dishes and mouth-watering meals to get started.
                </p>
                <Link
                  href="/menu"
                  onClick={closeCart}
                  className="px-5 py-2.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.menuItem.id}
                  className="p-3 rounded-xl bg-brand-darker/60 border border-brand-border/60 flex gap-3 items-center group hover:border-brand-gold/40 transition-all"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-brand-surface">
                    <Image
                      src={item.menuItem.imageUrl}
                      alt={item.menuItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">
                      {item.menuItem.name}
                    </h4>
                    <p className="text-xs text-brand-gold font-bold mt-0.5">
                      GH₵ {item.menuItem.price * item.quantity}
                      <span className="text-gray-500 font-normal ml-1">
                        (GH₵ {item.menuItem.price} each)
                      </span>
                    </p>
                    {item.specialInstructions && (
                      <p className="text-[11px] text-gray-400 italic truncate mt-0.5">
                        Note: {item.specialInstructions}
                      </p>
                    )}

                    {/* Quantity Adjustment */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-brand-border rounded-lg bg-brand-surface">
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                          className="p-1 hover:text-brand-gold text-gray-400 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                          className="p-1 hover:text-brand-gold text-gray-400 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.menuItem.id)}
                        className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove dish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {items.length > 0 && (
            <div className="p-4 bg-brand-dark border-t border-brand-border space-y-3">
              <div className="space-y-1.5 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">GH₵ {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee ({deliveryType})</span>
                  <span className="text-white font-medium">
                    {deliveryFee > 0 ? `GH₵ ${deliveryFee}` : "Free"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-brand-border/60">
                  <span>Total Due</span>
                  <span className="text-brand-gold">GH₵ {total}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/order"
                  onClick={closeCart}
                  id="proceed-checkout-btn"
                  className="w-full py-3 rounded-xl gold-btn text-sm font-bold flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Quick Order via WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
