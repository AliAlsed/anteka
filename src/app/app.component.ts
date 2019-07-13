import { Component, ViewChild } from '@angular/core';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ShoppingTabsPage } from './shopping-tabs/shopping-tabs';
import { Storage } from '@ionic/storage';
import { AuthProvider } from './services/auth/auth';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: any = ShoppingTabsPage;
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;


  constructor(platform: Platform,
    statusBar: StatusBar,
    public storage: Storage,
    public af: AuthProvider,
    private auth: AngularFireAuth,
    private splashScreen: SplashScreen,
    private route: Router
  ) {
    platform.ready().then(() => {
      statusBar.styleBlackTranslucent();
      splashScreen.hide();
      platform.backButton.subscribe(() => {
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
          this.routerOutlet.pop();
        } else if (this.route.url == "/auth") {
          navigator['app'].exitApp();
        } else if (this.route.url == "/tabs/home") {
          navigator['app'].exitApp();
        }
      })
      this.auth.authState.subscribe(user => {
        if (user != null) {
          this.route.navigate(['/tabs/home']);
        }
        if (user == null) {
          this.route.navigate(['/auth']);
        }
      })
      this.hide();
      console.log(af.isLoggedIn());
      this.storage.get('id').then((id) => {
        if (id == null) {
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              console.log(user.uid);
              storage.set('id', user.uid);
              storage.set('isloggedin', true);
            } else {
              console.log('please sign in');
              this.route.navigate(['/auth']);
            }

          });
        } else {
          console.log(id);
          storage.set('isloggedin', true);
        }
      });
    });
  }

  hide() {
    this.splashScreen.hide();

  }
}

