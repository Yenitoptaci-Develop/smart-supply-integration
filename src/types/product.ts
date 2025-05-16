
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  unit: string;
  image: string;
  supplier: string;
  description?: string;
  additionalImages?: string[];
  desi: number;
  quoteOnly?: boolean; // New field to identify quote-only products
}
