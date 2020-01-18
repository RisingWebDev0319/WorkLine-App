import { FCMService } from './services/fcm.service';
import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCMService,
    private toastCtrl: ToastController,
    private utilService: UtilService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }

  private async presentToast(message: any) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });

    toast.present();
  }

  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe((msg) => {
      console.log(msg);
      if (this.platform.is('ios')) {
        this.presentToast(msg.aps.alert);
      } else { 
        this.utilService.showNotification(msg.title, msg.message);
      }
    });
  }
}
