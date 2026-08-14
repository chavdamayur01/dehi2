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
  1: 299,
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
    price: 299,
    baseTotal: 499,
    savings: 200,
    savingsLabel: "Save ₹200",
  },
  {
    quantity: 2,
    title: "2 Body Washes",
    price: 499,
    baseTotal: 998,
    savings: 499,
    savingsLabel: "Save ₹499",
    popular: true,
  },
  {
    quantity: 3,
    title: "3 Body Washes",
    price: 699,
    baseTotal: 1497,
    savings: 798,
    savingsLabel: "Save ₹798",
  },
];

export function getQuantityPricing(qty: number): {
  quantity: ValidQuantity;
  price: number;
  savings: number;
  baseTotal: number;
  savingsLabel: string;
} {
  const quantity = (Math.max(1, Math.min(3, qty || 1))) as ValidQuantity;
  const price = QUANTITY_PRICING[quantity] || 299;
  const baseTotal = quantity * 499;
  const savings = baseTotal - price;
  const savingsLabel = `Save ₹${savings}`;
  return { quantity, price, savings, baseTotal, savingsLabel };
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
  price: 299,
  discount: 200,
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
