import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);

  readonly isSubmitted = signal(false);
  readonly isLoading = signal(false);
  readonly orderId = signal('');

  readonly deliveryFee = computed(() => 0);
  readonly total = computed(() => this.cartService.subtotal() + this.deliveryFee());

  customer = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    payment: 'card'
  };

  placeOrder(): void {
    if (
      !this.customer.fullName ||
      !this.customer.email ||
      !this.customer.phone ||
      !this.customer.address ||
      this.cartService.items().length === 0
    ) {
      return;
    }

    this.isLoading.set(true);

    this.orderService.createOrder({
      customer: this.customer,
      items: this.cartService.items(),
      subtotal: this.cartService.subtotal(),
      total: this.total()
    }).subscribe({
      next: response => {
        this.orderId.set(response.orderId);
        this.isSubmitted.set(true);
        this.cartService.clear();
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
}