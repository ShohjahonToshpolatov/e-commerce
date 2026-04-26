import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

const STORAGE_KEY = 'elite_wishlist_items';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly itemsSignal = signal<Product[]>(this.load());

  readonly items = this.itemsSignal.asReadonly();

  toggle(product: Product): void {
    const exists = this.isInWishlist(product.id);

    const next = exists
      ? this.itemsSignal().filter(item => item.id !== product.id)
      : [...this.itemsSignal(), product];

    this.itemsSignal.set(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  isInWishlist(productId: number): boolean {
    return this.itemsSignal().some(item => item.id === productId);
  }

  private load(): Product[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }
}