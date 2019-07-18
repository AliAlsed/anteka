import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'adminconnect', loadChildren: './adminconnect/adminconnect.module#AdminconnectPageModule', canActivate: [AuthGuard]  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'buy', loadChildren: './buy/buy.module#BuyPageModule', canActivate: [AuthGuard]  },
  { path: 'buy-products', loadChildren: './buy-products/buy-products.module#BuyProductsPageModule', canActivate: [AuthGuard] },
  {
    path: 'buy-products/:id',
    loadChildren: './buy-products/buy-products.module#BuyProductsPageModule',canActivate: [AuthGuard]
  },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule', canActivate: [AuthGuard] },
  {
    path: 'cart/:',
    loadChildren: './cart/cart.module#CartPageModule', canActivate: [AuthGuard]
  },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule', canActivate: [AuthGuard]  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard]  },

  { path: 'myproducts', loadChildren: './myproducts/myproducts.module#MyproductsPageModule', canActivate: [AuthGuard]  },
  { path: 'product', loadChildren: './product/product.module#ProductPageModule', canActivate: [AuthGuard]  },
  {
    path: 'product/:id',
    loadChildren: './product/product.module#ProductPageModule',
    canActivate: [AuthGuard] 
  },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [AuthGuard]  },
  { path: 'selectedproduct', loadChildren: './selectedproduct/selectedproduct.module#SelectedproductPageModule',canActivate: [AuthGuard]  },
  {
    path: 'selectedproduct/:',
    loadChildren: './selectedproduct/selectedproduct.module#SelectedproductPageModule',
    canActivate: [AuthGuard] 
  },
  { path: 'tabs', loadChildren: './shopping-tabs/shopping-tabs.module#ShoppingTabsPageModule',canActivate: [AuthGuard]  },
  { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule',canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
