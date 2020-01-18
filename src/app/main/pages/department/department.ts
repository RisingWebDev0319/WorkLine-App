import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { DepartmentService } from 'src/app/services/department.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'department',
    templateUrl: 'department.html',
    styleUrls: ['department.scss'],
})
export class DepartmentPage {
    deptID: any;
    userList: [any];
    taskList: [any];
    department: {
        members: {
            value: number
        }
        billing: {
            target: number,
            value: number
        },
        production: {
            target: number,
            value: number
        }
    };

    constructor(private _router: Router, private _route: ActivatedRoute, private utilService: UtilService,
        private alertCtrl: AlertController, private deptService: DepartmentService,
        private taskService: TaskService, private userService: UserService) {
        this.deptID = this._route.snapshot.params['deptID'];
        this.department = {
            members: { value: 0 },
            billing: { target: 0, value: 0 },
            production: { target: 0, value: 0 }
        };

        this.getDeptInfo({ id: this.deptID });
    }

    async getDeptInfo(data: any) {
        await this.utilService.showLoading();
        const self = this;
        this.deptService.getDeptInfo(data).then(async function (o) {
            await self.utilService.closeLoading();
            if (o.success) {
                self.department = o.data.department;
                self.userList = o.data.employees;
                self.department.members = {
                    value: self.userList.length
                };
                self.taskList = o.data.tasks;
            } else {
                self.utilService.showErrorToast(o.message);
            }
        }, (error) => {
            self.utilService.closeLoading();
            self.utilService.showErrorToast(error.message);
        });
    }

    getTaskStateLabel(state: any) {
        return this.taskService.getStatusLabel(state);
    }

    getUserStatusLabel(state: any) {
        return this.userService.getStatusLabel(state);
    }

    showEmployeePage(user: any) {
        this._router.navigate(['main/employee', { empID: user.id, empName: user.name }]);
    }

    showDeptCalendar() {
        const d = moment((new Date())).format('YYYY-MM-DD');
        this._router.navigate(['main/general-week-month-year', { date: d, type: 1, id: this.deptID }]);
    }

    showupdateInfo(type: any) {
        this.presentAlertPrompt(type);
    }

    async presentAlertPrompt(type: any) {
        let header = '';
        let value = 0;

        let self = this;

        if (type === 0) {
            header = 'Change Production';
            value = this.department.production.value;
        } else {
            header = 'Change Billing';
            value = this.department.billing.value;
        }

        const alert = await this.alertCtrl.create({
            header: header,
            inputs: [
                {
                    name: 'value',
                    type: 'number',
                    min: 1,
                    value: value
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'primary'
                }, {
                    text: 'Ok',
                    handler: (data) => {
                        self.updateInfo({
                            id: self.deptID,
                            type: type,
                            value: data.value
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    async updateInfo(data) {
        await this.utilService.showLoading();
        const self = this;
        this.deptService.updateInfo(data).then(async function (o) {
            await self.utilService.closeLoading();
            if (o.success) {
                self.department.production = o.department.production;
                self.department.billing = o.department.billing;
                self.utilService.showSuccessToast('Information is successfully updated');
            } else {
                self.utilService.showErrorToast(o.message);
            }
        }, (error) => {
            self.utilService.closeLoading();
            self.utilService.showErrorToast(error.message);
        });
    }

}
