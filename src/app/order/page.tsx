"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { PaymentMethod } from "@/types";
import confetti from "canvas-confetti";
import { 
  ShoppingBag, 
  Bike, 
  Store, 
  CreditCard, 
  MessageCircle, 
  Banknote, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  ArrowLeft, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  AlertCircle
} from "lucide-react";

export default function OrderPage() {
  const { 
    items, 
    subtotal, 
    deliveryFee, 
    total, 
    deliveryType, 
    setDeliveryType, 
    clearCart 
  } = useCart();

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("Tema Community 1-12");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("MOMO");
  const [momoNetwork, setMomoNetwork] = useState("MTN MoMo");
  const [momoNumber, setMomoNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const temaLocations = [
    "Tema Community 1",
    "Tema Community 2",
    "Tema Community 4",
    "Tema Community 7",
    "Tema Community 9",
    "Tema Community 11",
    "Tema Community 25",
    "Ashaiman / Lebanon",
    "Spintex Road",
    "Other Area in Tema",
  ];

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (items.length === 0) {
      setFormError("Your food basket is empty. Please add menu items first.");
      return;
    }

    if (!customerName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }

    if (!customerPhone.trim() || customerPhone.length < 9) {
      setFormError("Please enter a valid Ghana phone number (e.g. 0244 123 456 or 0264 449 211).");
      return;
    }

    if (deliveryType === "DELIVERY" && !deliveryAddress.trim()) {
      setFormError("Please specify your delivery address or landmark in Tema.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          orderType: deliveryType,
          deliveryAddress: deliveryType === "DELIVERY" ? `${deliveryArea}: ${deliveryAddress}` : "Pickup at Vee's Bite",
          deliveryArea,
          notes: orderNotes,
          paymentMethod,
          paymentStatus: paymentMethod === "MOMO" ? "PAID" : "PENDING",
          items,
          subtotal,
          deliveryFee,
          totalAmount: total,
        }),
      });

      const data = await res.json();
      if (data.success && data.order) {
        setOrderSuccess(data.order);
        clearCart();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setFormError(data.message || "Something went wrong creating your order.");
      }
    } catch (err) {
      setFormError("Network error. Please try again or order directly via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppDirectUrl = () => {
    const itemsList = items
      .map((i) => `• ${i.quantity}x ${i.menuItem.name} (GH₵ ${i.menuItem.price * i.quantity})`)
      .join("%0A");

    const text = `Hello Vee's Bite,%0A%0AI would like to confirm my order:%0ACustomer: ${customerName || "Customer"}%0APhone: ${customerPhone}%0AOrder Type: ${deliveryType}%0AAddress: ${deliveryAddress || "Pickup"}%0A%0AItems:%0A${itemsList}%0A%0ATotal Due: GH₵ ${total}%0APayment: ${paymentMethod}%0A%0APlease process my meal!`;
    return `https://wa.me/233264449211?text=${text}`;
  };

  // Order Confirmed Screen
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-brand-dark py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto rounded-3xl bg-brand-surface border border-brand-border p-8 sm:p-10 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-1">
            Order Successfully Placed!
          </span>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Medase! We've Received Your Order
          </h1>
          <p className="text-sm text-gray-300 max-w-md mx-auto mb-8">
            Our kitchen team has started preparing your meal with care. We will contact you at <strong>{orderSuccess.customerPhone}</strong> if needed.
          </p>

          {/* Receipt Card */}
          <div className="bg-brand-darker rounded-2xl border border-brand-border/70 p-6 text-left space-y-4 mb-8">
            <div className="flex justify-between items-center pb-3 border-b border-brand-border/50">
              <div>
                <span className="text-xs text-gray-400 block">Order Reference</span>
                <span className="text-base font-bold text-brand-gold">
                  {orderSuccess.orderNumber}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
                {orderSuccess.status}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Customer:</span>
                <span className="text-white font-medium">{orderSuccess.customerName}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Contact Phone:</span>
                <span className="text-white font-medium">{orderSuccess.customerPhone}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Fulfillment Type:</span>
                <span className="text-white font-medium">{orderSuccess.orderType}</span>
              </div>
              {orderSuccess.deliveryAddress && (
                <div className="flex justify-between text-gray-300">
                  <span>Location:</span>
                  <span className="text-white font-medium text-right max-w-xs">{orderSuccess.deliveryAddress}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-300">
                <span>Payment Method:</span>
                <span className="text-white font-medium">{orderSuccess.paymentMethod}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-brand-border/50 flex justify-between text-base font-bold text-white">
              <span>Total Amount:</span>
              <span className="text-brand-gold">GH₵ {orderSuccess.totalAmount}.00</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/233264449211?text=Hello%20Vee's%20Bite,%20I%20am%20checking%20on%20my%20order%20${orderSuccess.orderNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Track on WhatsApp
            </a>

            <Link
              href="/menu"
              className="px-6 py-3 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Order More Food
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-gold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Full Menu
          </Link>
        </div>

        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-1">
            Fast & Convenient
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Online Ordering & Checkout
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Place your order online with Ghana Mobile Money, Cash on Delivery, or directly via WhatsApp to Vee’s Bite in Tema.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-brand-surface rounded-2xl border border-brand-border p-12 text-center max-w-lg mx-auto">
            <ShoppingBag className="w-12 h-12 text-brand-gold mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-white mb-2">
              Your Food Basket is Empty
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Browse our menu to select delicious Ghanaian jollof, fresh banku, grills, or chilled beverages.
            </p>
            <Link
              href="/menu"
              className="px-6 py-3 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider inline-block"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Customer Information & Delivery Details */}
            <div className="lg:col-span-7 space-y-6">
              {formError && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Step 1: Delivery or Pickup */}
              <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-xl">
                <h3 className="text-base font-serif font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-gold text-brand-dark text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Choose Service Type
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType("DELIVERY")}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                      deliveryType === "DELIVERY"
                        ? "bg-brand-gold/15 border-brand-gold text-white font-bold"
                        : "bg-brand-darker border-brand-border text-gray-400 hover:text-white"
                    }`}
                  >
                    <Bike className="w-6 h-6 text-brand-gold" />
                    <div>
                      <div className="text-sm font-semibold">Delivery to Tema</div>
                      <div className="text-[11px] text-brand-gold mt-0.5">+GH₵ 15 flat fee</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType("PICKUP")}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                      deliveryType === "PICKUP"
                        ? "bg-brand-gold/15 border-brand-gold text-white font-bold"
                        : "bg-brand-darker border-brand-border text-gray-400 hover:text-white"
                    }`}
                  >
                    <Store className="w-6 h-6 text-brand-gold" />
                    <div>
                      <div className="text-sm font-semibold">Restaurant Pickup</div>
                      <div className="text-[11px] text-emerald-400 mt-0.5">Free collection</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Customer Contact */}
              <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-xl space-y-4">
                <h3 className="text-base font-serif font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-gold text-brand-dark text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Customer Details
                </h3>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Kwame Mensah"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                    Ghana Phone Number (For order updates / delivery rider) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. +233 24 123 4567 or 020 149 6782"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                {deliveryType === "DELIVERY" && (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Tema Delivery Area *
                      </label>
                      <select
                        value={deliveryArea}
                        onChange={(e) => setDeliveryArea(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                      >
                        {temaLocations.map((loc) => (
                          <option key={loc} value={loc} className="bg-brand-dark text-white">
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Street Address / House No. / Landmark *
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                        <textarea
                          rows={2}
                          required
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="e.g. House 42, Near Total Filling Station, Community 4"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold resize-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                    Order Instructions / Kitchen Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Extra shito, mild pepper for children, call before arrival..."
                    className="w-full px-4 py-2 rounded-xl bg-brand-darker border border-brand-border text-white text-xs focus:outline-none focus:border-brand-gold resize-none"
                  />
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-xl space-y-4">
                <h3 className="text-base font-serif font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-gold text-brand-dark text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  Select Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("MOMO")}
                    className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                      paymentMethod === "MOMO"
                        ? "bg-yellow-500/10 border-yellow-500 text-yellow-400 font-bold"
                        : "bg-brand-darker border-brand-border text-gray-400 hover:text-white"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-yellow-400" />
                    <span className="text-xs">Mobile Money</span>
                    <span className="text-[10px] text-gray-400">MTN / Telecel / AT</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("WHATSAPP")}
                    className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                      paymentMethod === "WHATSAPP"
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold"
                        : "bg-brand-darker border-brand-border text-gray-400 hover:text-white"
                    }`}
                  >
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs">WhatsApp Order</span>
                    <span className="text-[10px] text-gray-400">Fast Direct Chat</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("CASH")}
                    className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                      paymentMethod === "CASH"
                        ? "bg-blue-500/10 border-blue-500 text-blue-400 font-bold"
                        : "bg-brand-darker border-brand-border text-gray-400 hover:text-white"
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-blue-400" />
                    <span className="text-xs">Pay on Delivery</span>
                    <span className="text-[10px] text-gray-400">Cash / MoMo at door</span>
                  </button>
                </div>

                {/* MoMo Network Selector */}
                {paymentMethod === "MOMO" && (
                  <div className="p-4 rounded-xl bg-brand-darker border border-yellow-500/30 space-y-3 mt-3">
                    <div className="text-xs font-semibold text-yellow-400">
                      Mobile Money Payment Details:
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {["MTN MoMo", "Telecel Cash", "AT Money"].map((net) => (
                        <button
                          key={net}
                          type="button"
                          onClick={() => setMomoNetwork(net)}
                          className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            momoNetwork === net
                              ? "bg-yellow-500 text-black border-yellow-500"
                              : "bg-brand-surface border-brand-border text-gray-300"
                          }`}
                        >
                          {net}
                        </button>
                      ))}
                    </div>
                    <input
                      type="tel"
                      value={momoNumber}
                      onChange={(e) => setMomoNumber(e.target.value)}
                      placeholder={`Enter your ${momoNetwork} wallet number`}
                      className="w-full px-3.5 py-2 rounded-xl bg-brand-surface border border-brand-border text-xs text-white focus:outline-none focus:border-yellow-500"
                    />
                    <p className="text-[11px] text-gray-400">
                      * An authorization prompt will be dispatched to your phone, or you can send directly to our merchant number: <strong>0264 449 211</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary Card */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-2xl space-y-6">
                <h3 className="font-serif font-bold text-lg text-white pb-3 border-b border-brand-border/60">
                  Order Summary ({items.length} dishes)
                </h3>

                {/* Items preview list */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {items.map((i) => (
                    <div key={i.menuItem.id} className="flex justify-between items-start text-xs">
                      <div>
                        <div className="font-semibold text-white">
                          {i.quantity}x {i.menuItem.name}
                        </div>
                        {i.specialInstructions && (
                          <div className="text-[11px] text-gray-400 italic">
                            Note: {i.specialInstructions}
                          </div>
                        )}
                      </div>
                      <div className="text-brand-gold font-bold shrink-0 ml-2">
                        GH₵ {i.menuItem.price * i.quantity}.00
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financials */}
                <div className="pt-4 border-t border-brand-border/60 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">GH₵ {subtotal}.00</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Delivery Service ({deliveryType})</span>
                    <span className="text-white font-medium">
                      {deliveryFee > 0 ? `GH₵ ${deliveryFee}.00` : "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-brand-border/60">
                    <span>Total Amount</span>
                    <span className="text-brand-gold">GH₵ {total}.00</span>
                  </div>
                </div>

                {/* Primary Submit Button */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl gold-btn text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Processing Order..."
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Place Order (GH₵ {total}.00)
                      </>
                    )}
                  </button>

                  <a
                    href={getWhatsAppDirectUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Send Directly via WhatsApp
                  </a>
                </div>

                <div className="pt-2 text-center text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                  Direct order to Vee’s Bite & Events Center, Tema
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
