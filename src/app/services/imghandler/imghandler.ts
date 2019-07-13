import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase/app';

/*
  Generated class for the ImghandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImghandlerProvider {
  imgfile: any;
  constructor(public platform: Platform
    , public camera: Camera) { }
  firestore = firebase.storage();
  public galleryOptions: CameraOptions = {
    quality: 95,
    allowEdit: true,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    targetWidth: 720,
    targetHeight: 720,
    correctOrientation: true
  }

  picmsgstore(): Promise<any> {
    if (this.platform.ready) {
      var promise = new Promise((resolve, reject) => {
        this.camera.getPicture(this.galleryOptions).then((imageData) => {
          let url = 'data:image/jbeg;base64,' + imageData;
          let binary = atob(url.split(',')[1]);
          let array = [];
          for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i))
          }
          var blob = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
          var imageStore = this.firestore.ref('/picmsgs')
            .child(firebase.auth().currentUser.uid)
            .child('picmsg');
          imageStore.put(blob).then((res) => {
            resolve(res.downloadURL);
          }).catch((err) => {
            reject(err);
          })
        })
      })
    }
    return promise;
  }

}
