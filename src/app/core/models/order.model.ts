import { CartItem } from './cart-item.model';

export interface CustomerDetails {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    payment: string;
}

export interface CreateOrderRequest {
    customer: CustomerDetails;
    items: CartItem[];
    subtotal: number;
    total: number;
}