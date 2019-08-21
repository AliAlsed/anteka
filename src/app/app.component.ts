import { Component, ViewChild } from "@angular/core";
import { Platform, IonRouterOutlet } from "@ionic/angular";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ShoppingTabsPage } from "./shopping-tabs/shopping-tabs";
import { Storage } from "@ionic/storage";
import { AuthProvider } from "./services/auth/auth";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import * as firebase from "firebase/app";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import {Keyboard} from '@ionic-native/keyboard/ngx';
import * as $ from 'jquery';
@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  rootPage: any = ShoppingTabsPage;
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    public storage: Storage,
    public af: AuthProvider,
    private auth: AngularFireAuth,
    private splashScreen: SplashScreen,
    private keyboard: Keyboard,
    private route: Router
  ) {
    platform.ready().then(() => {
      statusBar.styleBlackTranslucent();
      this.keyboard.hideFormAccessoryBar(true);
      this.keyboard.setResizeMode('ionic');
      splashScreen.hide();
      platform.backButton.subscribe(() => {
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
          this.routerOutlet.pop();
        } else if (this.route.url == "/auth") {
          navigator["app"].exitApp();
        } else if (this.route.url == "/tabs/home") {
          navigator["app"].exitApp();
        }
      });
      // this.auth.authState.subscribe(user => {
      //   if (user != null) {
      //     this.route.navigate(['/tabs/home']);
      //   }
      //   if (user == null) {
      //     this.route.navigate(['/auth']);
      //   }
      // })
      // this.storage.get("isloggedin").then(authenticated => {
      //   if (authenticated != null) {
      //     this.route.navigate(["/tabs/home"]);
      //   }
      //   if (authenticated == null) {
      //     this.route.navigate(["/auth"]);
      //   }
      // });
      this.hide();
      console.log(af.isLoggedIn());
      this.storage.get("id").then(id => {
        if (id == null) {
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              console.log(user.uid);
              storage.set("id", user.uid);
              storage.set("isloggedin", true);
            } else {
              console.log("please sign in");
              this.route.navigate(["/auth"]);
            }
          });
        } else {
          console.log(id);
          storage.set("isloggedin", true);
        }
      });
    });
  }

  hide() {
    this.splashScreen.hide();
  }
  ngAfterViewInit() {
    // This element never changes.
    let ionapp = document.getElementsByTagName("ion-app")[0];

    window.addEventListener('keyboardDidShow', async (event) => {
        // Move ion-app up, to give room for keyboard
        let kbHeight: number = event["keyboardHeight"] / 8 ;
        let viewportHeight: number = $(window).height();
        let inputFieldOffsetFromBottomViewPort: number = viewportHeight - $(':focus')[0].getBoundingClientRect().bottom;
        let inputScrollPixels = kbHeight - (inputFieldOffsetFromBottomViewPort * 3 );

        // Set margin to give space for native keyboard.
        ionapp.style["margin-bottom"] = kbHeight.toString() + "px";

        // But this diminishes ion-content and may hide the input field...
        if (inputScrollPixels > 0) {
            // ...so, get the ionScroll element from ion-content and scroll correspondingly
            // The current ion-content element is always the last. If there are tabs or other hidden ion-content elements, they will go above.
            let ionScroll = await $("ion-content").last()[0].getScrollElement();
            setTimeout(() => {
                $(ionScroll).animate({
                    scrollTop: ionScroll.scrollTop + inputScrollPixels
                }, 300);
            }, 300); // Matches scroll animation from css.
        }
    });
    window.addEventListener('keyboardDidHide', () => {
        // Move ion-app down again
        // Scroll not necessary.
        ionapp.style["margin-bottom"] = "0px";
    });
}
}
