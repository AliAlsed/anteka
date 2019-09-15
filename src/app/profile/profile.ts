import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfilePage implements OnInit {
  user = {
    'email': '',
    'image': '',
    'name': '',
    'phone': '',
    'address': ''
  }
  loading;
  list;
  constructor(private storage: Storage,
    private db: AngularFireDatabase, private af: AngularFireAuth, public load: LoadingController) {
    this.list = db.list("fods").snapshotChanges();
  }

  async ngOnInit() {
    await this.storage.get('id').then((userid) => {
      this.db.list(`users/${userid}`).valueChanges().subscribe((data) => {
        if (data[0]) {
          this.user.address = data[0].toString();
          this.user.email = data[1].toString();
          this.user.name = data[3].toString();
          this.user.image = data[2].toString();
          this.user.phone = data[4].toString();
        }
      });
    })
  }

  async logout() {
    await this.af.auth.signOut().then(async () => {
      await this.storage.set('id', null);
      await  this.storage.set('isloggedin', false);
      this.loading = await this.load.create({
        message: "جاري تسجيل خروج ",
        cssClass: "dirion"
      });
      await this.loading.present();

    }).then(() => {
      this.loading.dismiss();
    });
  }


}
