export interface Product {
  id: string;
  name: string;
  tagline: string;
  size: string;
  mrp: number;
  price: number;
  discount: number;
  description: string;
  shortDescription: string;
  images: {
    main: string;
    angle2: string;
    differentAngle: string;
    angle4: string;
  };
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ValidQuantity = 1 | 2 | 3;

export const QUANTITY_PRICING: Record<ValidQuantity, number> = {
  1: 399,
  2: 499,
  3: 699,
} as const;

export interface QuantityOffer {
  quantity: ValidQuantity;
  title: string;
  price: number;
  baseTotal: number;
  savings: number;
  savingsLabel?: string;
  popular?: boolean;
}

export const QUANTITY_OFFERS: QuantityOffer[] = [
  {
    quantity: 1,
    title: "1 Body Wash",
    price: 399,
    baseTotal: 399,
    savings: 0,
  },
  {
    quantity: 2,
    title: "2 Body Washes",
    price: 499,
    baseTotal: 798,
    savings: 299,
    savingsLabel: "Save ₹299",
    popular: true,
  },
  {
    quantity: 3,
    title: "3 Body Washes",
    price: 699,
    baseTotal: 1197,
    savings: 498,
    savingsLabel: "Save ₹498",
  },
];

export function getQuantityPricing(qty: number): {
  quantity: ValidQuantity;
  price: number;
  savings: number;
  baseTotal: number;
} {
  const quantity = (Math.max(1, Math.min(3, qty || 1))) as ValidQuantity;
  const price = QUANTITY_PRICING[quantity] || 399;
  const baseTotal = quantity * 399;
  const savings = baseTotal - price;
  return { quantity, price, savings, baseTotal };
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod?: string;
}

export interface OrderConfirmation {
  orderId: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  shipping: number;
  total: number;
  orderDate: string;
}

export const DEHI_PRODUCT: Product = {
  id: "dehi-body-wash-200ml",
  name: "Dehi Body Wash",
  tagline: "Care for every Body",
  size: "200 mL",
  mrp: 499,
  price: 399,
  discount: 100,
  description: "Experience a refreshing shower with Dehi Body Wash. Our sulfate-free and paraben-free formula gently cleanses while helping maintain your skin's natural moisture. Enriched with natural herbal ingredients, it leaves your skin feeling soft, fresh, and hydrated after every wash.",
  shortDescription: "Gentle cleansing. Everyday freshness.",
  images: {
    main: "/images/product.png",
    angle2: "/images/productangel2.png",
    differentAngle: "/images/productdifferntangle.png",
    angle4: "/images/productangle4.png",
  },
  features: [
    "Sulfate-Free",
    "Herbal Care",
    "Hydrating",
    "Cruelty-Free",
    "Suitable for Daily Use",
  ],
};

export interface DbOrder {
  id: string;
  order_number: string;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  product_name: string;
  product_size: string;
  quantity: number;
  total_price: number;
  status: string;
  admin_note?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface OrderInsertPayload {
  order_number: string;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  product_name: string;
  product_size: string;
  quantity: ValidQuantity;
  total_price: number;
  status: string;
  admin_note?: string | null;
}

export interface OrderApiResponse {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  quantity?: number;
  totalPrice?: number;
  error?: string;
}
