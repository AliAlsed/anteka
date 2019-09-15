import { Component } from '@angular/core';
import {
  NavController, LoadingController,
  ToastController, ModalController
} from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import $ from "jquery";
import { AuthProvider } from '.././services/auth/auth';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import { PhoneLoginComponent } from '../phone-login/phone-login.component';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'auth',
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss'],
})

export class AuthPage {
  name = "";
  emailreg = "";
  passreg = "";
  phone = "";
  userId;
  fireUser = firebase.database().ref(`users`);
  constructor(public navCtrl: NavController,
              public db: AngularFireDatabase,
              public auth: AuthProvider,
              private router: Router,
              public storage: Storage,
              public load: LoadingController,
              public toast: ToastController,
              public modal: ModalController
  ) {
  }

  async register(email, pass, phone) {
    var load = await this.load.create({
      message: "جاري انشاء الحساب",
      cssClass: "loaddire"
    });

    if (this.emailreg.replace(/\s/g, "") != "" && this.passreg.replace(/\s/g, "") != "") {

      load.present();
      this.auth.register(this.emailreg, this.passreg, this.phone).then((user: any) => {
        this.auth.addPhone(phone);
        this.storage.set('isloggedin', true);
        this.router.navigate(['/user-profile']);
        load.dismiss();

      }, (e) => {
        console.log(e);
        if (e.message == "The email address is already in use by another account.") {
          this.presentToast("هذا الحساب مستخدم مسبقا");
        } else if (e.message == "A network error (such as timeout, interrupted connection or unreachable host) has occurred.") {
          this.presentToast("يرجى التحقق من الاتصال بلشبكة");
        }
        load.dismiss();
      }).catch(() => {
        load.dismiss();
      });

    } else {
      console.log(email + ' ' + pass + '' + phone);
    }
    console.log(this.emailreg + ' ' + this.passreg);
  }


  showLogin() {
    $(".register").slideUp();
    $(".login").slideDown();

  }

  async login(email, pass) {
    var load = await this.load.create({
      message: "جاري تسجيل الدخول",
      cssClass: "loaddire"
    });

    if (email.length > 0 && pass.length > 0) {
      load.present();
      this.auth.login(email, pass).then((user) => {
        console.log('uid -------------------' + user.user.uid);
        this.storage.set('id', user.user.uid);
        this.storage.set('isloggedin', true);
        this.storage.get('id').then((res) => {
          console.log(res);
          this.userId = res;
          this.fireUser.child(user.user.uid).on('value', (snap) => {
            if (snap.val()) {
              load.dismiss();
              this.router.navigate(['/tabs/home']);
            } else {
              load.dismiss();
              this.router.navigate(['/user-profile']);
            }
          });
        }).catch(() => {
          load.dismiss();
        });
      }, (err) => {
        load.dismiss();
        if (err.message == "The password is invalid or the user does not have a password.") {
          this.presentToast("كلمة مرور غير صحيحة");
        }

        if (err.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
          this.presentToast("بريد الكتروني غير موجود");
        }

        if (err.message == "A network error (such as timeout, interrupted connection or unreachable host) has occurred.") {
          this.presentToast("يرجى التحقق من الاتصال بلشبكة");
        }
      })
    }
  }



  showRegister() {
    $(".login").slideUp();
    $(".register").slideDown();
  }

  private async presentToast(message) {
    const toast = await this.toast.create({
      message,
      duration: 3000,
      cssClass: "setdire"
    });
    toast.present();
  }



  async showPhoneLogin() {
    const modal = await this.modal.create({
      component: PhoneLoginComponent,
      componentProps: {

        imgTitle: "phoneNumber",
        imgDescription: "passCode",
      },

    });

    return await modal.present();

  }







}


