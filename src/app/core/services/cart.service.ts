import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

const STORAGE_KEY = 'elite_cart_items';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private readonly itemsSignal = signal<CartItem[]>(this.loadCart());

    readonly items = this.itemsSignal.asReadonly();

    readonly totalItems = computed(() =>
        this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0)
    );

    readonly subtotal = computed(() =>
        this.itemsSignal().reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        )
    );

    addToCart(product: Product): void {
        const items = this.itemsSignal();
        const existingItem = items.find(item => item.product.id === product.id);

        if (existingItem) {
            this.setItems(
                items.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
            return;
        }

        this.setItems([...items, { product, quantity: 1 }]);
    }

    increase(productId: number): void {
        this.setItems(
            this.itemsSignal().map(item =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    decrease(productId: number): void {
        const nextItems = this.itemsSignal()
            .map(item =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter(item => item.quantity > 0);

        this.setItems(nextItems);
    }

    remove(productId: number): void {
        this.setItems(
            this.itemsSignal().filter(item => item.product.id !== productId)
        );
    }

    clear(): void {
        this.setItems([]);
    }

    private setItems(items: CartItem[]): void {
        this.itemsSignal.set(items);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }

    private loadCart(): CartItem[] {
        const value = localStorage.getItem(STORAGE_KEY);

        if (!value) {
            return [];
        }

        try {
            return JSON.parse(value) as CartItem[];
        } catch {
            return [];
        }
    }
}