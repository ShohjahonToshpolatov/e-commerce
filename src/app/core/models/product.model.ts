export interface Product {
    id: number;
    name: string;
    brand: string;
    category: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    badge?: string;
    inStock: boolean;
}