export interface Variant {
  id: number;
  product_id: number;
  barcode: string;
  price: number;
  stock: number;
  size?: string;
  color?: string;
}
