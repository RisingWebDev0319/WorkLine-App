import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from './user.service';

@Injectable()
export class FCMService {

    constructor(
        private firebase: Firebase,
        private afs: AngularFirestore,
        private userService: UserService,
        private platform: Platform) { }

    async getToken() {
        let token: any;

        if (this.platform.is('android')) {
            token = await this.firebase.getToken();
        }else if (this.platform.is('ios')) {
            token = await this.firebase.getToken();
            await this.firebase.grantPermission();
        }else {
            token = '';
        }

        this.saveToken(token);
    }

    private saveToken(token: any) {
        this.userService.setDeviceToken(token);
    }

    onNotifications() {
        return this.firebase.onNotificationOpen();
    }
}