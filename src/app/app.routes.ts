import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'products',
                loadComponent: () =>
                    import('./pages/products/products.component').then(m => m.ProductsComponent)
            },
            {
                path: 'cart',
                loadComponent: () =>
                    import('./pages/cart/cart.component').then(m => m.CartComponent)
            },
            {
                path: 'checkout',
                loadComponent: () =>
                    import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)
            }
        ]
    }
];