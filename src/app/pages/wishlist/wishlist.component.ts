import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}