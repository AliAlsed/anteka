import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ToastController,
  ActionSheetController
} from "@ionic/angular";
import { ProductManagementProvider } from ".././services/product-management/product-management";
import { Storage } from "@ionic/storage";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: "selectedproduct",
  templateUrl: "./selectedproduct.html",
  styleUrls: ['./selectedproduct.scss'],
})
export class SelectedproductPage implements OnInit {
  key;
  product = {
    description: '',
    image: '',
    name: '',
    price: '',
    status: '',
    userid: ''
  };
  i = 1;
  constructor(
    public navCtrl: NavController,
    public pm: ProductManagementProvider,
    public storage: Storage,
    public db: AngularFireDatabase,
    public toast: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    // this.product = this.navParams.data;
    this.route.queryParams.subscribe((res) => {
      console.log(res);
      this.product.description = res.description;
      this.product.image = res.image;
      this.product.name = res.name;
      this.product.price = res.price;
      this.product.status = res.status ? res.status : '';
      this.product.userid = res.uid;
    });
  }

  add() {
    this.i++;
  }
  rem() {
    if (this.i == 1) {
    } else {
      this.i--;
    }
  }
  async buy(item) {
    this.presentActiom(item);
  }

  private async presentToast(message) {
    const toast = await this.toast.create({
      message,
      duration: 3000,
      cssClass: "setdire"
    });
    toast.present();
  }

  async presentActiom(item) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "شراء ",
      buttons: [
        {
          text: "اضافة الى السلة",
          handler: () => {
            this.storage.get("id").then(userid => {
              this.db
                .list(`users/${userid}`)
                .valueChanges()
                .subscribe(data => {
                  if (data[0]) {
                    this.pm
                      .buy(
                        this.i,
                        item.name,
                        item.description,
                        item.price,
                        item.image,
                        data[3],
                        data[0],
                        data[4]
                      ).then(() => {
                        this.db.list(`cart/${userid}`).push({
                          count: this.i,
                          name: item.name,
                          desc: item.description,
                          price: item.price,
                          image: item.image,
                        }).then((item) => {
                          console.log(item);
                        });
                      }, (err) => {
                        console.dir(err);
                      })
                      .then(() => {
                        this.presentToast("تم");
                        this.router.navigate(['/tabs/home']);
                      });
                  }
                });
            });
          }
        }
      ]
    });
    await actionSheet.present();
  }
}
