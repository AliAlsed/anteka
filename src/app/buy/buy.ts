import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthProvider } from '.././services/auth/auth';


@Component({
  selector: 'buy',
  templateUrl: './buy.html',
  styleUrls: ['./buy.scss'],
})
export class BuyPage {

  constructor(public navCtrl: NavController,
    private _AuthProvider: AuthProvider) {
  }

  buy(name: string) {
    if (this._AuthProvider.isLoggedIn()) {
      console.log(this._AuthProvider.isLoggedIn());
      console.log(name);
    } else {
      console.log(this._AuthProvider.isLoggedIn());
    }

  }
}
