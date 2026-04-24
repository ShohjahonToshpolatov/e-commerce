import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-products',
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly productService = new ProductService();

  readonly search = signal('');
  readonly selectedCategory = signal('All');
  readonly sortBy = signal('featured');

  readonly products = signal(this.productService.getProducts());
  readonly categories = this.productService.getCategories();

  readonly filteredProducts = computed(() => {
    const searchValue = this.search().toLowerCase().trim();
    const category = this.selectedCategory();
    const sort = this.sortBy();

    let result = this.products().filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchValue) ||
        product.brand.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === 'All' || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === 'low') {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === 'high') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  });
}