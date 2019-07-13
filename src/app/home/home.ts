import { Component, OnInit } from '@angular/core';
import { AuthProvider } from '.././services/auth/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';
import { ExtrasService } from '../extras.service';
@Component({
  selector: 'page-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage implements OnInit {
  items: any = [];
  i = 0;
  constructor(public router: Router,
    private db: AngularFireDatabase,
    private _AuthProvider: AuthProvider,
    private storage: Storage,
    private _ExtrasService: ExtrasService) { }

  ngOnInit(): void {
    this.storage.get("id").then(userid => {
      this.db
        .list(`cart/${userid}`)
        .valueChanges()
        .subscribe(data => {
          console.log(data);
          this.items = data;
          this.i = data.length;
        });
    });
    console.log(this.items);
  }

  buy(item: string) {
    if (this._AuthProvider.isLoggedIn()) {
      this.router.navigate(['/product/'], {
        queryParams: { item },
      });

    } else {
      this.router.navigate(['/auth']);
    }

  }
  gotocart() {
    console.log(this.items);
    console.log(this.i);
    this._ExtrasService.setExtras(this.items);
    this.router.navigate(['/cart/']);
  }

}
