import { MenuItem, Order, EventBooking, CustomerEnquiry } from "@/types";

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Local Ghanaian Dishes
  {
    id: "dish-1",
    name: "Vee's Signature Ghanaian Jollof & Grilled Chicken",
    description: "Smoky, slow-cooked basmati jollof infused with rich tomato plum reduction, aromatic Ghanaian spices, served with juicy quarter grilled chicken, golden kelewele, and house shito.",
    price: 65,
    category: "local",
    imageUrl: "/images/jollof_chicken.jpg",
    available: true,
    spicy: true,
    popular: true,
    prepTimeMinutes: 20,
  },
  {
    id: "dish-2",
    name: "Fresh Banku with Whole Grilled Tilapia",
    description: "Steaming hot corn & cassava dough banku paired with a whole seasoned charcoal-grilled tilapia fish, fresh fiery red & green ground pepper, diced tomatoes, and sweet onions.",
    price: 85,
    category: "local",
    imageUrl: "/images/banku_tilapia.jpg",
    available: true,
    spicy: true,
    popular: true,
    prepTimeMinutes: 25,
  },
  {
    id: "dish-3",
    name: "Tema Special Waakye Fiesta",
    description: "Fragrant rice and beans cooked with sorghum leaves, served on fresh banana leaf with boiled egg, talia noodles, seasoned gari foto, fried fish, tender beef chunks, and deep black shito.",
    price: 60,
    category: "local",
    imageUrl: "/images/waakye.jpg",
    available: true,
    spicy: true,
    popular: true,
    prepTimeMinutes: 15,
  },
  {
    id: "dish-4",
    name: "Spicy Kelewele & Roasted Peanuts",
    description: "Ripe plantain diced and marinated in crushed ginger, chili, cloves, and onions, flash-fried to caramelized perfection, served with crunchy oven-roasted Tema peanuts.",
    price: 30,
    category: "snacks",
    imageUrl: "/images/jollof_chicken.jpg",
    available: true,
    spicy: true,
    popular: true,
    prepTimeMinutes: 10,
  },
  // Main Meals & Grills
  {
    id: "dish-5",
    name: "Special Assorted Fried Rice with Grilled Chicken",
    description: "Wok-tossed jasmine rice with sweet bell peppers, sweetcorn, spring onions, prawns, and egg, topped with succulent seasoned grilled chicken wings and spicy chili sauce.",
    price: 70,
    category: "mains",
    imageUrl: "/images/hero.jpg",
    available: true,
    spicy: false,
    popular: true,
    prepTimeMinutes: 20,
  },
  {
    id: "dish-6",
    name: "Charcoal Grilled Guinea Fowl with Spicy Jollof",
    description: "Tender local guinea fowl marinated in traditional suya herbs, flame-grilled over hot coals, accompanied by smoky jollof rice and crunchy cabbage slaw.",
    price: 95,
    category: "mains",
    imageUrl: "/images/jollof_chicken.jpg",
    available: true,
    spicy: true,
    popular: false,
    prepTimeMinutes: 30,
  },
  {
    id: "dish-7",
    name: "Spicy Beef Suya Skewers (4 Skewers)",
    description: "Tender strips of lean beef crusted with authentic Northern Ghanaian Kuli Kuli peanut rub and dried spices, grilled and garnished with raw onions and fresh tomato wedges.",
    price: 45,
    category: "snacks",
    imageUrl: "/images/hero.jpg",
    available: true,
    spicy: true,
    popular: true,
    prepTimeMinutes: 15,
  },
  // Drinks & Beverages
  {
    id: "dish-8",
    name: "House Chilled Spiced Sobolo",
    description: "Cold-infused ruby hibiscus drink brewed with fresh spicy ginger, sweet pineapple rind, cloves, and natural honey, garnished with fresh mint sprigs and orange slice.",
    price: 20,
    category: "drinks",
    imageUrl: "/images/drinks.jpg",
    available: true,
    spicy: false,
    popular: true,
    prepTimeMinutes: 5,
  },
  {
    id: "dish-9",
    name: "Fresh Pineapple, Ginger & Passion Juice",
    description: "Freshly pressed tropical sweet pineapple, zesty ginger root, and passion fruit puree served cold over crushed ice.",
    price: 25,
    category: "drinks",
    imageUrl: "/images/drinks.jpg",
    available: true,
    spicy: false,
    popular: false,
    prepTimeMinutes: 5,
  },
  {
    id: "dish-10",
    name: "Chilled Malt & Bottled Soft Drinks",
    description: "Choice of chilled Alvaro, Malta Guinness, Coca-Cola, Sprite, or sparkling water.",
    price: 15,
    category: "drinks",
    imageUrl: "/images/drinks.jpg",
    available: true,
    spicy: false,
    popular: false,
    prepTimeMinutes: 2,
  },
  {
    id: "dish-11",
    name: "Vee's Grand Executive Feast Platter (Serves 3-4)",
    description: "A lavish banquet board loaded with Ghanaian Jollof rice, Assorted Fried Rice, whole grilled tilapia, quarter grilled chicken, spicy suya beef, golden kelewele, and house sauces.",
    price: 240,
    category: "specials",
    imageUrl: "/images/hero.jpg",
    available: true,
    spicy: true,
    popular: true,
    prepTimeMinutes: 35,
  },
  {
    id: "dish-12",
    name: "Tema Fisherman's Seafood Special",
    description: "Fresh Atlantic prawns, calamari rings, and grilled tilapia steak sautéed in a rich ginger-garlic herb butter sauce with fried yam chips.",
    price: 130,
    category: "specials",
    imageUrl: "/images/banku_tilapia.jpg",
    available: true,
    spicy: false,
    popular: true,
    prepTimeMinutes: 30,
  },
  // Pastries & Snacks (from flyer)
  {
    id: "dish-13",
    name: "Assorted Fresh Pastries",
    description: "Selection of freshly baked pastries including meat pies, spring rolls, sausage rolls, and sweet doughnuts — perfect as a snack or party starter.",
    price: 20,
    category: "snacks",
    imageUrl: "/images/hero.jpg",
    available: true,
    spicy: false,
    popular: true,
    prepTimeMinutes: 5,
  },
  {
    id: "dish-14",
    name: "Freshly Popped Buttered Popcorn",
    description: "Light and crispy cinema-style popcorn, freshly popped and tossed in golden salted butter. Available in plain, sweet caramel, and spicy chili flavors.",
    price: 15,
    category: "snacks",
    imageUrl: "/images/hero.jpg",
    available: true,
    spicy: false,
    popular: false,
    prepTimeMinutes: 5,
  },
  // Pizza (from flyer)
  {
    id: "dish-15",
    name: "Vee's Special BBQ Chicken Pizza",
    description: "Stone-baked pizza base topped with smoky BBQ sauce, tender grilled chicken strips, sweet red onions, cheddar and mozzarella blend, finished with fresh basil.",
    price: 75,
    category: "mains",
    imageUrl: "/images/hero.jpg",
    available: true,
    spicy: false,
    popular: true,
    prepTimeMinutes: 20,
  },
  {
    id: "dish-16",
    name: "Classic Margherita & Pepperoni Pizza",
    description: "Traditional Italian-inspired pizza with rich tomato base, premium mozzarella, fresh basil leaves, and spicy pepperoni slices on a hand-stretched dough.",
    price: 65,
    category: "mains",
    imageUrl: "/images/hero.jpg",
    available: true,
    spicy: false,
    popular: false,
    prepTimeMinutes: 20,
  },
  // Barbeque (from flyer)
  {
    id: "dish-17",
    name: "Vee's BBQ Pork Ribs & Chicken Wings",
    description: "Slow-cooked marinated pork ribs and spiced chicken wings, basted in our smoky house BBQ sauce and flame-grilled to caramelized perfection. Served with coleslaw and fries.",
    price: 110,
    category: "mains",
    imageUrl: "/images/jollof_chicken.jpg",
    available: true,
    spicy: true,
    popular: true,
    prepTimeMinutes: 35,
  },
  // Bar
  {
    id: "dish-18",
    name: "Bar — Spirits, Beer & Cocktails",
    description: "Fully stocked bar serving premium spirits (Guinness, Club Beer, Schnapps, Rum, Whiskey), cocktails, and a range of chilled imported and local beverages.",
    price: 30,
    category: "drinks",
    imageUrl: "/images/drinks.jpg",
    available: true,
    spicy: false,
    popular: true,
    prepTimeMinutes: 3,
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1",
    orderNumber: "VB-1024",
    customerName: "Kwame Mensah",
    customerPhone: "+233 24 456 7890",
    orderType: "DELIVERY",
    deliveryAddress: "House 14, Community 4, Tema",
    deliveryArea: "Tema Community 4",
    notes: "Please add extra shito and pack separately.",
    paymentMethod: "MOMO",
    paymentStatus: "PAID",
    status: "PREPARING",
    subtotal: 150,
    deliveryFee: 15,
    totalAmount: 165,
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[0],
        quantity: 2,
        specialInstructions: "Quarter chicken well done",
      },
      {
        menuItem: INITIAL_MENU_ITEMS[7],
        quantity: 1,
      },
    ],
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
  },
  {
    id: "ord-2",
    orderNumber: "VB-1025",
    customerName: "Abena Osei",
    customerPhone: "+233 20 890 1234",
    orderType: "PICKUP",
    deliveryAddress: undefined,
    notes: "Will pick up around 1:30 PM",
    paymentMethod: "WHATSAPP",
    paymentStatus: "PENDING",
    status: "PENDING",
    subtotal: 85,
    deliveryFee: 0,
    totalAmount: 85,
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[1],
        quantity: 1,
        specialInstructions: "Mild green pepper",
      },
    ],
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: "ord-3",
    orderNumber: "VB-1026",
    customerName: "Kofi Boateng",
    customerPhone: "+233 55 321 9876",
    orderType: "DELIVERY",
    deliveryAddress: "Plot 8, Community 1, near Meridian Hotel",
    deliveryArea: "Tema Community 1",
    paymentMethod: "CASH",
    paymentStatus: "PENDING",
    status: "OUT_FOR_DELIVERY",
    subtotal: 105,
    deliveryFee: 15,
    totalAmount: 120,
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[2],
        quantity: 1,
      },
      {
        menuItem: INITIAL_MENU_ITEMS[6],
        quantity: 1,
      },
    ],
    createdAt: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
  },
];

export const INITIAL_EVENT_BOOKINGS: EventBooking[] = [
  {
    id: "ev-1",
    bookingNumber: "EV-204",
    fullName: "Dr. Emmanuel & Serwaa Darko",
    phone: "+233 24 555 4321",
    email: "e.darko@gmail.com",
    eventType: "WEDDING",
    preferredDate: "2026-11-21",
    alternateDate: "2026-11-28",
    startTime: "14:00",
    endTime: "21:00",
    guestCount: 120,
    cateringOption: "BUFFET",
    spacePreference: "MAIN_HALL",
    additionalNotes: "We require stage setup, gold and cream decor draping, and sound system for 7 hours.",
    status: "CONFIRMED",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ev-2",
    bookingNumber: "EV-205",
    fullName: "Priscilla Ansah",
    phone: "+233 20 112 3344",
    email: "priscilla.a@outlook.com",
    eventType: "BIRTHDAY",
    preferredDate: "2026-10-24",
    startTime: "18:00",
    endTime: "23:00",
    guestCount: 50,
    cateringOption: "FINGER_FOODS",
    spacePreference: "GARDEN_TERRACE",
    additionalNotes: "30th Birthday celebration. Cocktail tables, fairy lights, finger foods, and DJ corner.",
    status: "NEW",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ev-3",
    bookingNumber: "EV-206",
    fullName: "Apex Logistics Ghana Ltd (Contact: Evans)",
    phone: "+233 50 887 7665",
    email: "events@apexlogistics.com.gh",
    eventType: "CORPORATE",
    preferredDate: "2026-11-05",
    startTime: "09:00",
    endTime: "16:00",
    guestCount: 80,
    cateringOption: "PLATED",
    spacePreference: "MAIN_HALL",
    additionalNotes: "Annual staff retreat and awards ceremony. Requires projector, PA microphones, morning coffee break & lunch.",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
  },
];

export const INITIAL_ENQUIRIES: CustomerEnquiry[] = [
  {
    id: "enq-1",
    name: "Akosua Frimpong",
    email: "akosua.f@gmail.com",
    phone: "+233 24 333 9988",
    subject: "Outside Catering for Baby Christening",
    message: "Hello Vee's Bite, do you provide outside catering drop-off service for 40 people in Community 25?",
    status: "NEW",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "enq-2",
    name: "David K. Quarshie",
    email: "david@quarshie.org",
    phone: "+233 20 777 6655",
    subject: "VIP Lounge Table Reservation",
    message: "Can we reserve a quiet private booth for 6 guests this Friday evening around 7:30 PM?",
    status: "REPLIED",
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
  },
];

// Global In-Memory Store with dynamic updates
let menuItems = [...INITIAL_MENU_ITEMS];
let orders = [...INITIAL_ORDERS];
let eventBookings = [...INITIAL_EVENT_BOOKINGS];
let customerEnquiries = [...INITIAL_ENQUIRIES];

export const dataStore = {
  getMenuItems: () => menuItems,
  getMenuItemById: (id: string) => menuItems.find((item) => item.id === id),
  addMenuItem: (item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = {
      ...item,
      id: `dish-${Date.now()}`,
    };
    menuItems.unshift(newItem);
    return newItem;
  },
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => {
    menuItems = menuItems.map((item) => (item.id === id ? { ...item, ...updates } : item));
    return menuItems.find((item) => item.id === id);
  },
  deleteMenuItem: (id: string) => {
    menuItems = menuItems.filter((item) => item.id !== id);
    return true;
  },

  getOrders: () => orders,
  getOrderById: (id: string) => orders.find((o) => o.id === id),
  createOrder: (orderData: Omit<Order, "id" | "orderNumber" | "createdAt">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `VB-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    return newOrder;
  },
  updateOrderStatus: (id: string, status: Order["status"]) => {
    orders = orders.map((o) => (o.id === id ? { ...o, status } : o));
    return orders.find((o) => o.id === id);
  },

  getEventBookings: () => eventBookings,
  createEventBooking: (bookingData: Omit<EventBooking, "id" | "bookingNumber" | "status" | "createdAt">) => {
    const newBooking: EventBooking = {
      ...bookingData,
      id: `ev-${Date.now()}`,
      bookingNumber: `EV-${Math.floor(200 + Math.random() * 800)}`,
      status: "NEW",
      createdAt: new Date().toISOString(),
    };
    eventBookings.unshift(newBooking);
    return newBooking;
  },
  updateBookingStatus: (id: string, status: EventBooking["status"]) => {
    eventBookings = eventBookings.map((b) => (b.id === id ? { ...b, status } : b));
    return eventBookings.find((b) => b.id === id);
  },

  getEnquiries: () => customerEnquiries,
  createEnquiry: (enquiryData: Omit<CustomerEnquiry, "id" | "status" | "createdAt">) => {
    const newEnquiry: CustomerEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: "NEW",
      createdAt: new Date().toISOString(),
    };
    customerEnquiries.unshift(newEnquiry);
    return newEnquiry;
  },
  updateEnquiryStatus: (id: string, status: CustomerEnquiry["status"]) => {
    customerEnquiries = customerEnquiries.map((e) => (e.id === id ? { ...e, status } : e));
    return customerEnquiries.find((e) => e.id === id);
  },
};
