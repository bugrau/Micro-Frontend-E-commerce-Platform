declare module 'product-listings/productSlice' {
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
  }
}
