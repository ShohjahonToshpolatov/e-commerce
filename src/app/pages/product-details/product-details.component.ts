import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly quantity = signal(1);
  readonly product = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.productService.getProductById(id);
  });

  increase(): void {
    this.quantity.update(value => value + 1);
  }

  decrease(): void {
    this.quantity.update(value => Math.max(1, value - 1));
  }

  addToCart(): void {
    const product = this.product();
    if (!product) return;

    for (let i = 0; i < this.quantity(); i++) {
      this.cartService.addToCart(product);
    }
  }
} 