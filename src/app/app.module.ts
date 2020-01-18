import { FCMService } from './services/fcm.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { MainModule } from './main/main.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';

const config = {
  apiKey: 'AIzaSyCzRwsv_YdwhKWCL2V2zxOzujMCK8QSb6A',
  authDomain: 'workline-56102.firebaseapp.com',
  databaseURL: 'https://workline-56102.firebaseio.com',
  projectId: 'workline-56102',
  storageBucket: 'workline-56102.appspot.com',
  messagingSenderId: '1079694646868'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MainModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    FCMService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
