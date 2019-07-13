import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, LoadingController, AlertController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { ChatProvider } from '.././services/chat/chat';
import { ImghandlerProvider } from '.././services/imghandler/imghandler';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
})
export class ChatPage {
  //@ViewChild('content') content: Content;
  buddy: any;
  newmessage;
  key: any;
  allmessages = [];
  res = [];
  ses = [];
  photoURL;
  imgornot;
  show = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public chatservice: ChatProvider,
    public events: Events,
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    public imgstore: ImghandlerProvider,
    public alertCtrl: AlertController,
    public platform: Platform,
    private db: AngularFireDatabase) {
    if (this.platform.ready) {
      this.buddy = this.chatservice.friend;
      this.scrollto();
      this.events.subscribe('newmessage', () => {
        this.allmessages = [];
        this.imgornot = [];
        this.zone.run(() => {
          this.allmessages = this.chatservice.friendmessages;
          for (var key in this.allmessages) {
            if (this.allmessages[key].message.substring(0, 4) == 'http')
              this.imgornot.push(true);
            else
              this.imgornot.push(false);
          }
        })


      })
    }
  }

  addmessage() {
    //this.newmessage
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      //this.content.scrollToBottom();
      this.newmessage = '';
    })
  }

  ionViewDidEnter() {
    this.chatservice.getfriendmessages();
  }

  scrollto() {
    setTimeout(() => {
      //this.content.scrollToBottom();
    }, 1000);
  }

  async sendPicMsg() {
    let loader = await this.loadingCtrl.create({
      message: 'Please wait'
    });
    loader.present();
    this.imgstore.picmsgstore().then((imgurl) => {
      loader.dismiss();
      this.chatservice.addnewmessage(imgurl).then(() => {
        this.scrollto();
        this.newmessage = '';
      })
    }).catch((err) => {
      alert(err);
      loader.dismiss();
    })

  }


  ionViewDidLoad() {
    this.db.list(`users/${firebase.auth().currentUser.uid}`).valueChanges().subscribe((data) => {
      if (data[0]) {
        this.photoURL = data[2].toString();
      }
    }, (err) => {
    });
  }
}
