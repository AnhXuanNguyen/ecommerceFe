import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'app', loadChildren: () => import('./auth/auth.module').then(modules => modules.AuthModule)
  },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(modules => modules.HomeModule)
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module').then(modules => modules.UserModule)
  },
  {
    path: 'shop', loadChildren: () => import('./shop/shop.module').then(modules => modules.ShopModule)
  },
  {
    path: 'product', loadChildren: () => import('./product/product.module').then(modules => modules.ProductModule)
  },
  {
    path: 'cart', loadChildren: () => import('./cart/cart.module').then(modules => modules.CartModule)
  },
  {
    path: 'order', loadChildren: () => import('./order/order.module').then(modules => modules.OrderModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
