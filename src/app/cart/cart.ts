import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { ExtrasService } from '../extras.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss'],
})
export class CartPage implements OnInit {
  ngOnInit(): void {
    this.items = this._ExtrasService.getExtras();
    this.items = this.items;
    console.log(this.items);
    if (this.items != null || this.items.length >= 1) {
      this.items.forEach(element => {
        console.log(element.count * element.price)
        this.total = this.total + (element.count * element.price);
        console.log('total : ' + this.total);
      });
    }
  }
  items: any = [];
  total: number = 0;
  constructor(
    private _ExtrasService: ExtrasService, private router: Router,
    private storage: Storage, private db: AngularFireDatabase) {
  }

  clear() {
    this.storage.get("id").then(userid => {
      this.db.list(`cart/${userid}`).remove().then(() => {
        this.router.navigate(['/tabs/home']);
      });
    });
  }
}
