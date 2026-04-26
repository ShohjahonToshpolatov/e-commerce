import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private readonly products: Product[] = [
        {
            id: 1,
            name: 'AirFlex Runner Pro',
            brand: 'Nike',
            category: 'Shoes',
            price: 129,
            oldPrice: 159,
            rating: 4.8,
            reviews: 342,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop',
            badge: 'Best seller',
            inStock: true
        },
        {
            id: 2,
            name: 'Minimal Cotton Hoodie',
            brand: 'Zara',
            category: 'Fashion',
            price: 79,
            rating: 4.6,
            reviews: 188,
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&auto=format&fit=crop',
            badge: 'New',
            inStock: true
        },
        {
            id: 3,
            name: 'Studio Wireless Headphones',
            brand: 'Sony',
            category: 'Electronics',
            price: 219,
            oldPrice: 259,
            rating: 4.9,
            reviews: 721,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop',
            badge: 'Hot deal',
            inStock: true
        },
        {
            id: 4,
            name: 'Smart Fitness Watch',
            brand: 'Samsung',
            category: 'Electronics',
            price: 189,
            rating: 4.7,
            reviews: 419,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop',
            inStock: true
        },
        {
            id: 5,
            name: 'Premium Leather Backpack',
            brand: 'Montblanc',
            category: 'Bags',
            price: 149,
            oldPrice: 199,
            rating: 4.5,
            reviews: 96,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&auto=format&fit=crop',
            inStock: false
        },
        {
            id: 6,
            name: 'Classic Denim Jacket',
            brand: 'Levi’s',
            category: 'Fashion',
            price: 99,
            rating: 4.6,
            reviews: 253,
            image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=900&auto=format&fit=crop',
            badge: 'Limited',
            inStock: true
        }
    ];

    getProducts(): Product[] {
        return this.products;
    }

    getCategories(): string[] {
        return ['All', ...new Set(this.products.map(product => product.category))];
    }

    getProductById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }

}