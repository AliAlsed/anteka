import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HomePage } from '../home/home';
import { MyproductsPage } from '../myproducts/myproducts';
import { BuyPage } from '../buy/buy';
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage'
import { AdminconnectPage } from '../adminconnect/adminconnect';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'shopping-tabs',
  templateUrl: './shopping-tabs.html',
  styleUrls: ['./shopping-tabs.scss'],
})
export class ShoppingTabsPage implements OnInit {
  //@ViewChild('myTabs') tabRef: Tabs;
  m = false;
  allproductsRoot = HomePage;
  buyRoot = BuyPage
  myproductsRoot = MyproductsPage;
  myProfile = ProfilePage;
  admin = AdminconnectPage;

  constructor(public navCtrl: NavController,private route:Router ,  public af: Storage, private Auth: AngularFireAuth) {

  }


  async ngOnInit() {
    const user = await this.isLoggedIn();
    if (user) {
      this.m = true;
    } else {
      // do something else
      this.m = false;
    }
  }
  isLoggedIn() {
    return this.Auth.authState.pipe(first()).toPromise();
  }
}
