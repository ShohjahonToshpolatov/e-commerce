import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
            { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
            { path: 'products/:id', loadComponent: () => import('./pages/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
            { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent) },
            { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent) },
            { path: 'wishlist', loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent) },
            { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
            { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
            { path: 'account', loadComponent: () => import('./pages/account/account.component').then(m => m.AccountComponent) },
            { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
            {
                path: 'products/:id',
                loadComponent: () =>
                    import('./pages/product-details/product-details.component').then(m => m.ProductDetailsComponent)
            },
            {
                path: 'wishlist',
                loadComponent: () =>
                    import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent)
            },
        ]
    }
];