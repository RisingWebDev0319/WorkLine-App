import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Injectable()
export class UtilService {
    public loading: any;
    public toast: any;
    constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    }

    async showErrorToast(msg) {
        this.toast = await this.toastCtrl.create({
            message: msg,
            duration: 2500,
            showCloseButton: false,
            position: 'bottom',
            cssClass: 'toast-error'
        });

        await this.toast.present();
    }

    async showLoading() {
        this.loading = await this.loadingCtrl.create({
            spinner: 'circles',
            animated: true
        });

        await this.loading.present();
    }

    async closeLoading() {
        if (this.loading) {
            await this.loading.dismiss();
        }
    }

    async showSuccessToast(msg) {
        this.toast = await this.toastCtrl.create({
            message: msg,
            duration: 2500,
            showCloseButton: false,
            position: 'bottom',
            cssClass: 'toast-success'
        });

        await this.toast.present();
    }

    async showNotification(title, body) {
        const alert = await this.alertCtrl.create({
            header: title,
            message: body,
            buttons: ['OK']
        });
        await alert.present();
    }
}
