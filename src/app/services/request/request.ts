import { Injectable } from '@angular/core';
import { request } from '../model/request';
import * as firebase from 'firebase/app';

/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {
  firereq = firebase.database().ref('/requests');
  constructor() {
    console.log('Hello RequestProvider Provider');
  }
  sendrequest(req: request) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
        sender: req.sender
      }).then(() => {
        resolve({ success: true });
      })
    })
    return promise;
  }
}
