import { Component, OnInit } from '@angular/core';
import { AuthProvider } from '../services/auth/auth';
import { request } from '../services/model/request';
import { RequestProvider } from '../services//request/request';
import { ChatProvider } from '../services/chat/chat';
import { NavController, AlertController, ActionSheetController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'adminconnect',
  templateUrl: './adminconnect.html',
  styleUrls: ['./adminconnect.scss'],
})
export class AdminconnectPage implements OnInit {

  chat = false;
  filteredusers: any;
  newrequest = {} as request;

  constructor(public navCtrl: NavController,
    public auth: AuthProvider,
    public requestservice: RequestProvider,
    public alertCtrl: AlertController,
    private router: Router,
    public chatS: ChatProvider,
    public actionSheetCtrl: ActionSheetController) {
  }

  ngOnInit() {
    this.auth.getAdmin().then((data) => {
      this.filteredusers = data;
    });
    this.auth.ableToChat().then((data: any) => {
      for (var i in data) {
        console.log(data[i].chat);
        if (data[i].chat == true) {
          this.chat = true;
        } else {
          this.chat = false;
        }
      }
    });
  }

  async chatme(filteredusers) {
    console.log(this.chat);
    if (!this.chat) {
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'الاجرائات',
        buttons: [
          {
            text: 'ارسال الطلب',
            handler: () => {
              this.newrequest.sender = firebase.auth().currentUser.uid;
              this.newrequest.recipient = 'ZSeg05j2Mjh2lbL14YhzROc9FSJ2';

              this.requestservice.sendrequest(this.newrequest).then((res: any) => {
                if (res.success) {
                  this.alert(filteredusers.name);
                }
              }).catch((err) => {
                alert(err);
              })
            }
          }
        ]
      });
      actionSheet.present();
    } else {
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'مراسلة الادمن',
        buttons: [
          {
            text: 'مراسلة',
            handler: () => {
              this.chatS.initializefriend(filteredusers);
              this.router.navigate(['/chat']);

            }
          }
        ]
      });
      actionSheet.present();
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'الاجرائات',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async alert(msg) {
    const successalert = await this.alertCtrl.create({
      header: 'ارسال الطلب',
      message: 'تم ارسال طلبك الى ' + msg,
      buttons: ['حسنا']
    });
    await successalert.present();
  }
}
