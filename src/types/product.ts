
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
  quoteOnly?: boolean; // Identifies quote-only products
}
