export type Language = 'ar' | 'en';

export type ProductCategory = 'all' | 'shirts' | 'pants' | 'tshirts' | 'winter';

export interface TierPrice {
  minQty: number;
  labelAr: string;
  labelEn: string;
  pricePerUnit: number;
}

export interface Product {
  id: string;
  sku: string;
  titleAr: string;
  titleEn: string;
  category: 'shirts' | 'pants' | 'tshirts' | 'winter';
  descriptionAr: string;
  descriptionEn: string;
  fabricAr: string;
  fabricEn: string;
  sizes: string[];
  colorsAr: string[];
  colorsEn: string[];
  basePrice: number; // in EGP
  moq: number; // minimum order quantity
  moqUnitAr: string;
  moqUnitEn: string;
  tiers: TierPrice[];
  image: string;
  inStock: boolean;
  featuredTagAr?: string;
  featuredTagEn?: string;
  boxPackQuantity: number; // units per dozen/carton
  gsmWeight?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  notes?: string;
}

export interface StoreOrderInfo {
  storeName: string;
  merchantName: string;
  phone: string;
  governorate: string;
  shippingAddress: string;
  paymentMethod: 'instapay' | 'cod' | 'vodafone_cash' | 'bank_transfer';
  customerNotes: string;
}
