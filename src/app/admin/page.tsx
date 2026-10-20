"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MenuItem, Order, EventBooking, CustomerEnquiry } from "@/types";
import { 
  ShieldCheck, 
  UtensilsCrossed, 
  ShoppingBag, 
  Calendar, 
  MessageSquare, 
  Settings, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Users, 
  Phone, 
  MessageCircle, 
  X, 
  Search,
  Filter,
  Eye,
  Check,
  AlertCircle
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "menu" | "orders" | "events" | "enquiries" | "settings">("overview");

  // State
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [eventBookings, setEventBookings] = useState<EventBooking[]>([]);
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter & Search states
  const [orderStatusFilter, setOrderStatusFilter] = useState("ALL");
  const [menuSearch, setMenuSearch] = useState("");

  // New Dish Modal State
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);
  const [newDishName, setNewDishName] = useState("");
  const [newDishPrice, setNewDishPrice] = useState("");
  const [newDishCategory, setNewDishCategory] = useState<MenuItem["category"]>("local");
  const [newDishDesc, setNewDishDesc] = useState("");
  const [newDishImage, setNewDishImage] = useState("/images/jollof_chicken.jpg");
  const [newDishSpicy, setNewDishSpicy] = useState(false);
  const [newDishPopular, setNewDishPopular] = useState(false);

  // Settings State
  const [businessName, setBusinessName] = useState("Vee's Bite & Events Center");
  const [businessPhone, setBusinessPhone] = useState("+233 20 149 6782");
  const [businessLocation, setBusinessLocation] = useState("QX3P+PW8, Tema, Ghana");
  const [openingHours, setOpeningHours] = useState("Daily, approximately 10:35 AM–10:00 PM");
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Load initial data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [resMenu, resOrders, resEvents, resEnq] = await Promise.all([
        fetch("/api/menu"),
        fetch("/api/orders"),
        fetch("/api/events"),
        fetch("/api/enquiries"),
      ]);

      const dataMenu = await resMenu.json();
      const dataOrders = await resOrders.json();
      const dataEvents = await resEvents.json();
      const dataEnq = await resEnq.json();

      if (dataMenu.items) setMenuItems(dataMenu.items);
      if (dataOrders.orders) setOrders(dataOrders.orders);
      if (dataEvents.bookings) setEventBookings(dataEvents.bookings);
      if (dataEnq.enquiries) setEnquiries(dataEnq.enquiries);
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update order status
  const handleUpdateOrderStatus = async (id: string, status: Order["status"]) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status } : o))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Update booking status
  const handleUpdateBookingStatus = async (id: string, status: EventBooking["status"]) => {
    try {
      const res = await fetch("/api/events", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setEventBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle dish availability
  const handleToggleDishAvailability = async (dish: MenuItem) => {
    try {
      const res = await fetch("/api/menu", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: dish.id, available: !dish.available }),
      });
      const data = await res.json();
      if (data.success) {
        setMenuItems((prev) =>
          prev.map((item) =>
            item.id === dish.id ? { ...item, available: !item.available } : item
          )
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete dish
  const handleDeleteDish = async (id: string) => {
    if (!confirm("Are you sure you want to remove this menu item?")) return;
    try {
      const res = await fetch(`/api/menu?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMenuItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Add new dish
  const handleCreateDish = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newDishName,
          price: Number(newDishPrice),
          category: newDishCategory,
          description: newDishDesc,
          imageUrl: newDishImage,
          spicy: newDishSpicy,
          popular: newDishPopular,
        }),
      });
      const data = await res.json();
      if (data.success && data.item) {
        setMenuItems((prev) => [data.item, ...prev]);
        setIsAddDishModalOpen(false);
        setNewDishName("");
        setNewDishPrice("");
        setNewDishDesc("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeOrdersCount = orders.filter((o) => o.status !== "COMPLETED" && o.status !== "CANCELLED").length;
  const pendingBookingsCount = eventBookings.filter((b) => b.status === "NEW" || b.status === "CONTACTED").length;

  const filteredOrders =
    orderStatusFilter === "ALL"
      ? orders
      : orders.filter((o) => o.status === orderStatusFilter);

  const filteredMenuItems = menuItems.filter((i) =>
    i.name.toLowerCase().includes(menuSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-dark py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-glow bg-[#0a192f]">
              <Image
                src="/logo.png"
                alt="Vee's Bite Logo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                Management Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Vee’s Bite & Events Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="px-4 py-2 rounded-xl bg-brand-surface border border-brand-border text-xs font-semibold text-gray-300 hover:text-white"
            >
              Refresh Data
            </button>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Online
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-brand-border/40 scrollbar-none">
          {[
            { id: "overview", label: "Overview & Metrics", icon: ShieldCheck },
            { id: "orders", label: `Live Orders (${orders.length})`, icon: ShoppingBag },
            { id: "events", label: `Event Bookings (${eventBookings.length})`, icon: Calendar },
            { id: "menu", label: `Menu Items (${menuItems.length})`, icon: UtensilsCrossed },
            { id: "enquiries", label: `Customer Messages (${enquiries.length})`, icon: MessageSquare },
            { id: "settings", label: "Business Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-brand-gold text-brand-dark shadow-glow font-bold"
                    : "bg-brand-surface border border-brand-border text-gray-300 hover:text-white hover:border-brand-gold/40"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Gross Food Sales</span>
                  <DollarSign className="w-5 h-5 text-brand-gold" />
                </div>
                <div className="text-3xl font-serif font-bold text-brand-gold">
                  GH₵ {totalRevenue}.00
                </div>
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Across {orders.length} lifetime orders
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Active Kitchen Orders</span>
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-3xl font-serif font-bold text-white">
                  {activeOrdersCount}
                </div>
                <span className="text-[11px] text-amber-400 mt-1 block">
                  Pending preparation / delivery
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Event Enquiries</span>
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-serif font-bold text-white">
                  {pendingBookingsCount}
                </div>
                <span className="text-[11px] text-blue-400 mt-1 block">
                  Awaiting review & proposal
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Customer Rating</span>
                  <Users className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-serif font-bold text-white">
                  4.4 / 5.0
                </div>
                <span className="text-[11px] text-emerald-400 mt-1 block">
                  7 verified Google reviews
                </span>
              </div>
            </div>

            {/* Recent Orders and Bookings split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif font-bold text-lg text-white">
                    Latest Food Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-bold text-brand-gold hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 4).map((order) => (
                    <div
                      key={order.id}
                      className="p-3.5 rounded-xl bg-brand-darker border border-brand-border flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">
                            {order.orderNumber}
                          </span>
                          <span className="text-xs text-gray-400">• {order.customerName}</span>
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          {order.orderType} • {order.items.length} items • {order.paymentMethod}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-brand-gold text-xs">
                          GH₵ {order.totalAmount}.00
                        </div>
                        <span className="text-[10px] uppercase font-bold text-amber-400">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Event Reservations */}
              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif font-bold text-lg text-white">
                    Upcoming Event Bookings
                  </h3>
                  <button
                    onClick={() => setActiveTab("events")}
                    className="text-xs font-bold text-brand-gold hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {eventBookings.slice(0, 4).map((booking) => (
                    <div
                      key={booking.id}
                      className="p-3.5 rounded-xl bg-brand-darker border border-brand-border flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">
                            {booking.eventType}
                          </span>
                          <span className="text-xs text-gray-400">• {booking.fullName}</span>
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          Date: {booking.preferredDate} • {booking.guestCount} Guests • {booking.spacePreference}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30">
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Management */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-serif font-bold text-white">
                Orders Management ({filteredOrders.length})
              </h2>

              {/* Status Filter */}
              <div className="flex flex-wrap items-center gap-2">
                {["ALL", "PENDING", "PREPARING", "OUT_FOR_DELIVERY", "COMPLETED", "CANCELLED"].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        orderStatusFilter === st
                          ? "bg-brand-gold text-brand-dark"
                          : "bg-brand-surface border border-brand-border text-gray-300 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="p-8 text-center text-gray-400 bg-brand-surface rounded-2xl border border-brand-border">
                  No orders found in this category.
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-lg space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-border/60">
                      <div>
                        <span className="text-base font-bold text-brand-gold mr-3">
                          #{order.orderNumber}
                        </span>
                        <span className="font-semibold text-white mr-3">
                          {order.customerName}
                        </span>
                        <a
                          href={`tel:${order.customerPhone}`}
                          className="text-xs text-gray-400 hover:text-brand-gold inline-flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" /> {order.customerPhone}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          {order.status}
                        </span>
                        <span className="text-base font-bold text-white">
                          GH₵ {order.totalAmount}.00
                        </span>
                      </div>
                    </div>

                    {/* Order Meta details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-300">
                      <div>
                        <strong className="text-gray-400 block">Fulfillment:</strong>
                        {order.orderType} {order.deliveryAddress ? `(${order.deliveryAddress})` : ""}
                      </div>
                      <div>
                        <strong className="text-gray-400 block">Payment Method:</strong>
                        {order.paymentMethod} ({order.paymentStatus})
                      </div>
                      <div>
                        <strong className="text-gray-400 block">Ordered On:</strong>
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="p-3 rounded-xl bg-brand-darker border border-brand-border/60 space-y-1.5">
                      {order.items.map((i, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="text-white">
                            {i.quantity}x {i.menuItem.name}
                            {i.specialInstructions && (
                              <span className="text-gray-400 italic ml-2">
                                [Note: {i.specialInstructions}]
                              </span>
                            )}
                          </span>
                          <span className="text-brand-gold font-semibold">
                            GH₵ {i.menuItem.price * i.quantity}.00
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons to advance pipeline */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, "")}?text=Hello%20${order.customerName},%20this%20is%20Vee's%20Bite%20regarding%20order%20${order.orderNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600/90 text-white text-xs font-bold flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          WhatsApp Customer
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 mr-1">Advance Status:</span>
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, "PREPARING")}
                          className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs font-semibold"
                        >
                          Preparing
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, "OUT_FOR_DELIVERY")}
                          className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 text-xs font-semibold"
                        >
                          In Delivery
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, "COMPLETED")}
                          className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-semibold"
                        >
                          Completed
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Event Bookings */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-white">
              Event Hall & Venue Reservations ({eventBookings.length})
            </h2>

            <div className="space-y-4">
              {eventBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-lg space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-border/60">
                    <div>
                      <span className="text-sm font-bold text-brand-gold mr-3">
                        #{b.bookingNumber}
                      </span>
                      <span className="font-serif font-bold text-lg text-white mr-3">
                        {b.fullName}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase">
                        {b.eventType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30">
                        {b.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-gray-300">
                    <div>
                      <strong className="text-gray-400 block">Requested Date:</strong>
                      <span className="text-white font-medium">{b.preferredDate}</span>
                      {b.alternateDate && (
                        <span className="text-gray-400 block">(Backup: {b.alternateDate})</span>
                      )}
                    </div>
                    <div>
                      <strong className="text-gray-400 block">Time & Duration:</strong>
                      {b.startTime} – {b.endTime}
                    </div>
                    <div>
                      <strong className="text-gray-400 block">Guests & Venue Space:</strong>
                      {b.guestCount} Guests • {b.spacePreference}
                    </div>
                    <div>
                      <strong className="text-gray-400 block">Catering Option:</strong>
                      {b.cateringOption}
                    </div>
                  </div>

                  {b.additionalNotes && (
                    <div className="p-3 rounded-xl bg-brand-darker border border-brand-border/60 text-xs text-gray-300">
                      <strong>Client Notes / Setup:</strong> {b.additionalNotes}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-3">
                      <a
                        href={`tel:${b.phone}`}
                        className="px-3 py-1.5 rounded-lg bg-brand-surfaceLight border border-brand-border text-xs text-white hover:text-brand-gold flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call {b.phone}
                      </a>
                      <a
                        href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=Hello%20${b.fullName},%20we%20received%20your%20event%20booking%20enquiry%20for%20${b.preferredDate}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600/90 text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 mr-1">Update Status:</span>
                      <button
                        onClick={() => handleUpdateBookingStatus(b.id, "CONTACTED")}
                        className="px-2.5 py-1 rounded bg-yellow-500/20 text-yellow-300 text-xs font-semibold"
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => handleUpdateBookingStatus(b.id, "CONFIRMED")}
                        className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-semibold"
                      >
                        Confirm Booking
                      </button>
                      <button
                        onClick={() => handleUpdateBookingStatus(b.id, "DECLINED")}
                        className="px-2.5 py-1 rounded bg-red-500/20 text-red-300 text-xs font-semibold"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Menu Items Management */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  placeholder="Filter dishes by name..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-brand-surface border border-brand-border text-white text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>

              <button
                onClick={() => setIsAddDishModalOpen(true)}
                className="px-4 py-2.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-glow"
              >
                <Plus className="w-4 h-4" />
                Add New Dish
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-brand-surface border border-brand-border p-4 shadow-lg flex flex-col justify-between"
                >
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-brand-darker">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase text-brand-gold">
                        {item.category}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                        {item.description}
                      </p>
                      <span className="text-sm font-bold text-brand-gold block mt-2">
                        GH₵ {item.price}.00
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-brand-border/60 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleDishAvailability(item)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        item.available
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {item.available ? "In Stock" : "Out of Stock"}
                    </button>

                    <button
                      onClick={() => handleDeleteDish(item.id)}
                      className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                      title="Delete dish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Customer Messages */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-white">
              Customer Enquiries ({enquiries.length})
            </h2>

            <div className="space-y-4">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-lg space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif font-bold text-base text-white">
                        {enq.subject}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        From: <strong className="text-gray-200">{enq.name}</strong> ({enq.email})
                        {enq.phone && ` • Phone: ${enq.phone}`}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      {enq.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 p-3 rounded-xl bg-brand-darker border border-brand-border/60">
                    "{enq.message}"
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={`mailto:${enq.email}?subject=Re:%20${encodeURIComponent(enq.subject)}`}
                      className="px-4 py-2 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider"
                    >
                      Reply by Email
                    </a>
                    {enq.phone && (
                      <a
                        href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Business Settings */}
        {activeTab === "settings" && (
          <div className="max-w-3xl rounded-3xl bg-brand-surface border border-brand-border p-8 shadow-2xl space-y-6">
            <h2 className="text-2xl font-serif font-bold text-white mb-2">
              Business Information & Operational Settings
            </h2>

            {settingsSaved && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Settings updated successfully!</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-gray-300 block mb-1">
                  Business Name:
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">
                  Official Telephone Number:
                </label>
                <input
                  type="text"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">
                  Physical Address / Plus Code:
                </label>
                <input
                  type="text"
                  value={businessLocation}
                  onChange={(e) => setBusinessLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">
                  Daily Opening Hours:
                </label>
                <input
                  type="text"
                  value={openingHours}
                  onChange={(e) => setOpeningHours(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-darker border border-brand-border text-white text-sm"
                />
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSettingsSaved(true);
                    setTimeout(() => setSettingsSaved(false), 3000);
                  }}
                  className="px-6 py-3 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider"
                >
                  Save Business Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add New Dish Modal */}
      {isAddDishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-brand-surface border border-brand-border p-6 text-white shadow-2xl">
            <button
              onClick={() => setIsAddDishModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-xl mb-4">
              Add New Dish to Menu
            </h3>

            <form onSubmit={handleCreateDish} className="space-y-4 text-xs">
              <div>
                <label className="block mb-1 font-semibold text-gray-300">
                  Dish Name *
                </label>
                <input
                  type="text"
                  required
                  value={newDishName}
                  onChange={(e) => setNewDishName(e.target.value)}
                  placeholder="e.g. Grilled Red Snapper with Fried Yam"
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-semibold text-gray-300">
                    Price in Ghana Cedis (GH₵) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newDishPrice}
                    onChange={(e) => setNewDishPrice(e.target.value)}
                    placeholder="e.g. 75"
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-300">
                    Category *
                  </label>
                  <select
                    value={newDishCategory}
                    onChange={(e) => setNewDishCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-darker border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold"
                  >
                    <option value="local">Local Ghanaian</option>
                    <option value="mains">Main Meals & Grills</option>
                    <option value="snacks">Snacks & Small Chops</option>
                    <option value="drinks">Drinks & Juices</option>
                    <option value="specials">Chef's Specials</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-300">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDishDesc}
                  onChange={(e) => setNewDishDesc(e.target.value)}
                  placeholder="Appetizing description of ingredients and spices..."
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-darker border border-brand-border text-white text-xs focus:outline-none focus:border-brand-gold resize-none"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDishSpicy}
                    onChange={(e) => setNewDishSpicy(e.target.checked)}
                    className="rounded bg-brand-darker border-brand-border text-brand-gold"
                  />
                  <span>Mark as Spicy</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDishPopular}
                    onChange={(e) => setNewDishPopular(e.target.checked)}
                    className="rounded bg-brand-darker border-brand-border text-brand-gold"
                  />
                  <span>Mark as Popular</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddDishModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-brand-surfaceLight border border-brand-border text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl gold-btn font-bold uppercase tracking-wider"
                >
                  Add Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
