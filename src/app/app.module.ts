import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { firebaseConfig } from './app.firebase';
import { AuthProvider } from './services/auth/auth';
import { ProductManagementProvider } from './services/product-management/product-management';
import { IonicStorageModule } from '@ionic/storage'
import { RequestProvider } from './services/request/request';
import { ChatProvider } from './services/chat/chat';
import { ImghandlerProvider } from './services/imghandler/imghandler';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { RouteReuseStrategy } from '@angular/router';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ExtrasService } from './extras.service';
import { File } from '@ionic-native/file/ngx';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';


@NgModule({
  declarations: [AppComponent,ImageViewerComponent,PhoneLoginComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  bootstrap: [AppComponent,ImageViewerComponent,PhoneLoginComponent],
  providers: [
    StatusBar,
    File,
    Camera,
    AngularFireAuth,
    Keyboard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} },
    SplashScreen,
    AuthProvider,
    AngularFireDatabase,
    ProductManagementProvider,
    RequestProvider,
    ChatProvider,
    ImghandlerProvider,
    ExtrasService,
    FirebaseAuthentication

  ]
})
export class AppModule { }
