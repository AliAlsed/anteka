import { Component, OnInit } from '@angular/core';
import {
   ModalController,
  ToastController, 
} from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { WindowService } from '../window.service';

var window;

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss'],
})
export class PhoneLoginComponent implements OnInit {

  isComplete = false;
  fromFacebook: any;
  phone: any;
  windowRef: any;
  verificationCode: string;
  check = false;
  constructor(
    private router: Router,
    private win: WindowService,
    private mdl:ModalController,
    private storage: Storage,
    public toastController: ToastController,
    private routerParam: ActivatedRoute) {
  }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
    });
    this.windowRef.recaptchaVerifier.render();
    }

  async sendcode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    await firebase.auth().signInWithPhoneNumber('+964' + this.phone, appVerifier)
      .then(result => {
        console.log(this.phone);
        this.windowRef.confirmationResult = result;
        this.check = true;
        this.presentToast("تم ارسال رمز التحقيق");
      })
      .catch(error => {
        this.check = false;
        console.log(error)
        this.presentToast(error);
      });
  }

  async verifyLoginCode(id,confirmationResult) {
    await this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        console.log(result.user);
        this.storage.set('phone', '+964' + this.phone);
        this.router.navigate(['user-profile']);
      }) .catch(error => {
        this.storage.set('verify', false);
        console.log(error, "Incorrect code entered?");
        this.presentToast(error);
      });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000
    });
    await toast.present();
  }
  async closeModal(){
    await this.mdl.dismiss();
  }
}