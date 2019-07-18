import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShoppingTabsPage } from './shopping-tabs';

const routes: Routes = [
    {
        path: '',
        component: ShoppingTabsPage,
        children:
        [
          {
            path: 'home',
            children:
              [
                {
                  path: '',
                  loadChildren: '../home/home.module#HomePageModule'
                }
              ]
          },
          {
            path: 'profile',
            children:
              [
                {
                  path: '',
                  loadChildren: '../profile/profile.module#ProfilePageModule'
                }
              ]
          },
          {
            path: 'admin',
            children:
              [
                {
                  path: '',
                  loadChildren: '../adminconnect/adminconnect.module#AdminconnectPageModule'
                }
              ]
          },
          {
            path: 'sell',
            children:
              [
                {
                  path: '',
                  loadChildren: '../buy/buy.module#BuyPageModule'
                }
              ]
          },
          {
            path: 'contact',
            children:
              [
                {
                  path: '',
                  loadChildren: '../contact-us/contact-us.module#ContactUsPageModule'
                }
              ]
          },
          {
            path: 'my-products',
            children:
              [
                {
                  path: '',
                  loadChildren: '../myproducts/myproducts.module#MyproductsPageModule'
                }
              ]
          },
          // {
          //   path: 'contact',
          //   children:
          //     [
          //       {
          //         path: '',
          //         loadChildren: '../contactus/contactus.module#ContactusPageModule'
          //       }
          //     ]
          // },
          // myproducts-root/myproducts-root.module#MyproductsRootPageModule
          {
            path: '',
            redirectTo: '/tabs/home',
            pathMatch: 'full'
          }
        ]
    },
    {
      path: '',
      redirectTo: '/tabs/home',
      pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ShoppingTabsPage]
})
export class ShoppingTabsPageModule { }
