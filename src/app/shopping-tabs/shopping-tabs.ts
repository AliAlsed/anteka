import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { MyproductsPage } from '../myproducts/myproducts';
import { BuyPage } from '../buy/buy';
import { ProfilePage } from '../profile/profile';
import { AdminconnectPage } from '../adminconnect/adminconnect';

@Component({
  selector: 'shopping-tabs',
  templateUrl: './shopping-tabs.html',
  styleUrls: ['./shopping-tabs.scss'],
})
export class ShoppingTabsPage {
  allproductsRoot = HomePage;
  buyRoot = BuyPage
  myproductsRoot = MyproductsPage;
  myProfile = ProfilePage;
  admin = AdminconnectPage;

  constructor() { }
}
