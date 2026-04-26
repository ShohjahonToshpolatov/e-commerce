import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { inject } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist.service';
@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  readonly wishlistService = inject(WishlistService);
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
}