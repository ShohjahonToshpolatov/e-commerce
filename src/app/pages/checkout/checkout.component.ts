import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  readonly cartService = inject(CartService);
  readonly isSubmitted = signal(false);

  readonly deliveryFee = computed(() => this.cartService.subtotal() > 0 ? 0 : 0);
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

    this.isSubmitted.set(true);
    this.cartService.clear();
  }
}