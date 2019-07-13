import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'adminconnect', loadChildren: './adminconnect/adminconnect.module#AdminconnectPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'buy', loadChildren: './buy/buy.module#BuyPageModule' },
  { path: 'buy-products', loadChildren: './buy-products/buy-products.module#BuyProductsPageModule' },
  {
    path: 'buy-products/:id',
    loadChildren: './buy-products/buy-products.module#BuyProductsPageModule'
  },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  {
    path: 'cart/:',
    loadChildren: './cart/cart.module#CartPageModule'
  },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },

  { path: 'myproducts', loadChildren: './myproducts/myproducts.module#MyproductsPageModule' },
  { path: 'product', loadChildren: './product/product.module#ProductPageModule' },
  {
    path: 'product/:id',
    loadChildren: './product/product.module#ProductPageModule'
  },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'selectedproduct', loadChildren: './selectedproduct/selectedproduct.module#SelectedproductPageModule' },
  {
    path: 'selectedproduct/:',
    loadChildren: './selectedproduct/selectedproduct.module#SelectedproductPageModule'
  },
  { path: 'tabs', loadChildren: './shopping-tabs/shopping-tabs.module#ShoppingTabsPageModule' },
  { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
