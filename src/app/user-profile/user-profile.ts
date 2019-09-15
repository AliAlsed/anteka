import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { AuthProvider } from '.././services/auth/auth';
import { User } from '../services/model/user';
import { ShoppingTabsPage } from '../shopping-tabs/shopping-tabs';
import * as firebase from 'firebase/app';
import $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss'],
})
export class UserProfilePage implements OnInit {

  address: string;
  name: string;
  phone: string;
  user: User;

  imageurl = "";
  imagecheck = false;

  mySelectedPhoto;
  loading;
  currentPhoto;
  imgSource;
  imgBlob;

  constructor(public navCtrl: Router,

    public db: AngularFireDatabase, public toast: ToastController,
    private camera: Camera, public load: LoadingController, public af: AuthProvider) {
  }

  ngOnInit() {
    console.log('ionViewDidLoad AddfodPage');
    var navh = $(".header").innerHeight();
    console.log(navh);
  }

  addfod(name: any, address: any) {
    this.af.addUser(name, address, this.imageurl).then((userProfile) => {
      this.user = {
        name: name,
        address: address,
        phone: firebase.auth().currentUser.phoneNumber,
        email: firebase.auth().currentUser.email,
        image: this.imageurl,
      }
      // this.presentToast("تم انشاء حسابك بنجاح ");
      //this.navCtrl.popToRoot();
    }).then(() => {
      //this.navCtrl.setRoot(ShoppingTabsPage);
      this.navCtrl.navigateByUrl('/tabs/home');

    });
  }
  async takePhoto() {
    const options: CameraOptions = {
      targetHeight: 720,
      targetWidth: 720,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    await this.camera.getPicture(options).then(
      imageData => {
        this.showloading();
        this.imgBlob = imageData;
      },
      err => {
        alert(JSON.stringify(err));
      }
    );
    this.mySelectedPhoto = await this.dataURLtoBlob(
      "data:image/jpeg;base64," + this.imgBlob
    );
    await this.upload();
  }

  dataURLtoBlob(myURL) {
    let binary = atob(myURL.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }


  upload() {


    var char = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v"];
    var rand1 = Math.floor(Math.random() * char.length);
    var rand2 = Math.floor(Math.random() * char.length);
    var rand3 = Math.floor(Math.random() * char.length);
    var rand4 = Math.floor(Math.random() * char.length);
    var rand = char[rand1] + char[rand2] + char[rand3] + char[rand4];

    if (this.mySelectedPhoto) {
      var uploadTask = firebase.storage().ref().child('images/' + rand + ".jpg");
      var put = uploadTask.put(this.mySelectedPhoto);
      put.then(() => {
        this.loading.dismiss();

        uploadTask.getDownloadURL().then(url => {

          this.imagecheck = true;
          this.imageurl = url;

        });

      });

      put.catch(err => {
        this.loading.dismiss();

        alert(JSON.stringify(err));
      })


    }
  }

  private async presentToast(message) {
    const toast = await this.toast.create({
      message,
      duration: 3000,
      cssClass: "setdire"
    });
    toast.present();
  }
  async showloading() {
    this.loading = await this.load.create({
      message: "جاري اضافة الصورة",
      cssClass: "loaddire"
    });
    await this.loading.present();
  }

}
