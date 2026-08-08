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
  };
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'upi' | 'card' | 'netbanking';
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
  },
  features: [
    "Sulfate-Free",
    "Herbal Care",
    "Hydrating",
    "Cruelty-Free",
    "Suitable for Daily Use",
  ],
};
