import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import $ from 'jquery';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-myproducts',
  templateUrl: './myproducts.html',
  styleUrls: ['./myproducts.scss'],
})
export class MyproductsPage implements OnInit {
  list: Observable<any>;

  ionViewDidLoad() {

  }
  constructor(public navCtrl: NavController,
    public db: AngularFireDatabase, public alert: AlertController,
    public toast: ToastController, private storage: Storage) { }

  ngOnInit() {
    var winh = $(window).height();
    var navh = $(".tabs-md .tab-button").innerHeight();

    $("page-menufood .waiteloading,page-menufood .notfoundheader").height(winh - (navh + navh));
    this.storage.get('id').then((res) => {
      this.list = this.db.list(`myproducts/${res}`).snapshotChanges();
      this.db.list(`myproducts/${res}`).valueChanges().subscribe(data => {

        $("page-menufood .waiteloading").hide();

        if (data[0] == undefined) {
          $("page-menufood .notfoundheader").css("display", "flex");
        }

        if (data[0] != undefined) {
          $("page-menufood .notfoundheader").hide();
        }
      });



    })

  }

  async delete(key) {
    const alert = await this.alert.create({
      message: "هل انت متأكد من حذف ",
      cssClass: "setdire",
      buttons: [{
        text: "حذف", handler: () => {
          this.storage.get('id').then((res) => {
            this.db.list(`myproducts/${res}`).remove(key).then(OmarReal => {
              this.presentToast("تم الحذف");
            })
          });
        }
      }, "الغاء"]
    });
    alert.present();
  }

  private async presentToast(message) {
    const toast = await this.toast.create({
      message,
      duration: 3000,
      cssClass: "setdire"
    });
    toast.present();
  }

}
