import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductSkeletonComponent } from '../../shared/components/product-skeleton/product-skeleton.component';

@Component({
  selector: 'app-products',
  imports: [FormsModule, ProductCardComponent, ProductSkeletonComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly search = signal('');
  readonly selectedCategory = signal('All');
  readonly sortBy = signal('featured');
  readonly toastMessage = signal('');

  readonly products = signal(this.productService.getProducts());
  readonly categories = this.productService.getCategories();
  readonly isLoading = signal(false);

  readonly filteredProducts = computed(() => {
    const searchValue = this.search().toLowerCase().trim();
    const category = this.selectedCategory();
    const sort = this.sortBy();

    let result = this.products().filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchValue) ||
        product.brand.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue);

      const matchesCategory = category === 'All' || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === 'low') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'high') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  });

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.toastMessage.set(`${product.name} added to cart`);

    setTimeout(() => {
      this.toastMessage.set('');
    }, 3000);
  }
}