import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { User } from '../model/user'
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {
  user: User;
  myuser;
  ab = false;
  public mreq = [];
  fireUser = firebase.database().ref(`users`);
  firefriends = firebase.database().ref(`friends`);
  constructor(public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public storage: Storage) {
  }
  login(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  async register(email: string, pass: string) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then((userData) => {
      console.log(userData);
    }
    )
  }
  async addUser(name, address, phone, imageurl) {
    if (imageurl.length < 1) {
      imageurl = 'https://www.shareicon.net/data/512x512/2016/05/29/772558_user_512x512.png';
    }
    return await this.db.object(`users/${firebase.auth().currentUser.uid}`).set({
      name: name,
      address: address,
      phone: phone,
      email: firebase.auth().currentUser.email,
      image: imageurl,
      uid: firebase.auth().currentUser.uid
    }).then(done => {
      console.log(done);
    }, (err) => {
      console.log(err);
    });
  }
  getUser(): firebase.database.Reference {
    return this.fireUser;
  }
  getAdmin() {
    var promise = new Promise((resolve, reject) => {
      this.fireUser.child('ZSeg05j2Mjh2lbL14YhzROc9FSJ2').once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  isLoggedIn(): boolean {
    if (firebase.auth().currentUser != null) {
      return true;
    } else {
      return false
    }
  }
  ableToChat() {
    var promise = new Promise((resolve, reject) => {
      this.storage.get('id').then((id) => {
        this.firefriends.child(id).once('value', (snapshot) => {
          //console.log(firebase.auth().currentUser.uid);
          resolve(snapshot.val());
        })
      }).catch((err) => {
        resolve(null);
        return null;
      })
    })
    return promise;

  }
}
