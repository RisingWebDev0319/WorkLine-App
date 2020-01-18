import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-login',
    templateUrl: 'login.html',
    styleUrls: ['login.scss'],
})

export class LoginPage {
    user = {
        name: '',
        code: '',
    };

    constructor(private _router: Router, private userService: UserService, private utilService: UtilService) { }

    async login() {
        if (this.user.name === '' || this.user.code === '') {
            this.utilService.showErrorToast('Please fill in blanks.');
            return;
        }

        await this.utilService.showLoading();

        const self = this;
        this.userService.authenticateUser({
            name: this.user.name,
            code: this.user.code,
            device_token: self.userService.getDeviceToken(),
            type: 1
        }).then(async function (o) {
            await self.utilService.closeLoading();
            if (o.success) {
                self.userService.setUser(o.user);
                self.userService.setIsLogin(true);
                self.userService.setToken(o.token);
                self.userService.startSendingLocationInfo();
                self._router.navigate(['main/']);
            } else {
                self.utilService.showErrorToast(o.message);
            }
        }, (error) => {
            this.utilService.closeLoading();
            this.utilService.showErrorToast(error.message);
        });
    }
}
