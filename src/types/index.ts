export type MenuCategory = "all" | "local" | "mains" | "snacks" | "drinks" | "specials";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // In Ghana Cedis (GH₵)
  category: "local" | "mains" | "snacks" | "drinks" | "specials";
  imageUrl: string;
  available: boolean;
  spicy?: boolean;
  popular?: boolean;
  prepTimeMinutes?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export type OrderStatus = "PENDING" | "PREPARING" | "OUT_FOR_DELIVERY" | "COMPLETED" | "CANCELLED";
export type PaymentMethod = "MOMO" | "CASH" | "WHATSAPP";
export type PaymentStatus = "PENDING" | "PAID";
export type OrderType = "DELIVERY" | "PICKUP";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  deliveryAddress?: string;
  deliveryArea?: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  createdAt: string;
}

export type EventType = 
  | "WEDDING"
  | "BIRTHDAY"
  | "CORPORATE"
  | "PARTY"
  | "FAMILY"
  | "RECEPTION"
  | "FUNERAL"
  | "LIVE_FOOTBALL"
  | "OTHER";

export type EventSpace = 
  | "MAIN_HALL"
  | "GARDEN_TERRACE"
  | "VIP_LOUNGE"
  | "CHILDREN_GROUND"
  | "FULL_VENUE";

export type CateringPreference = 
  | "BUFFET"
  | "PLATED"
  | "FINGER_FOODS"
  | "EXTERNAL";

export type BookingStatus = "NEW" | "CONTACTED" | "CONFIRMED" | "DECLINED";

export interface EventBooking {
  id: string;
  bookingNumber: string;
  fullName: string;
  phone: string;
  email?: string;
  eventType: EventType;
  preferredDate: string;
  alternateDate?: string;
  startTime: string;
  endTime: string;
  guestCount: number;
  cateringOption: CateringPreference;
  spacePreference: EventSpace;
  additionalNotes?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface CustomerEnquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "NEW" | "REPLIED" | "ARCHIVED";
  createdAt: string;
}
