import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-register',
    templateUrl: 'register.html',
    styleUrls: ['register.scss'],
})
export class RegisterPage {
    user = {
        name: '',
        code: '',
        mobile: '',
        type: 1,                                // 1: Employer  0: Employee
    };

    constructor(private _router: Router, private userService: UserService, private utilService: UtilService) { }

    async register() {
        if (this.user.name === '' || this.user.code === '' || this.user.mobile === '') {
            this.utilService.showErrorToast('Please fill in blanks.');
            return;
        }

        await this.utilService.showLoading();

        this.userService.registerUser({
            name: this.user.name,
            code: this.user.code,
            mobile: this.user.mobile,
            type: this.user.type
        }).then(o => {
            this.utilService.closeLoading();

            if (o.success) {
                this.utilService.showSuccessToast('Successfully Registered');
                this._router.navigate(['auth/login']);
            } else {
                this.utilService.showErrorToast(o.message);
            }
        }, (error) => {
            this.utilService.closeLoading();
            this.utilService.showErrorToast(error.message);
        });
    }
}
