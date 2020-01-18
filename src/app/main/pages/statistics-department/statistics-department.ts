import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { TaskService } from 'src/app/services/task.service';
import { DepartmentService } from 'src/app/services/department.service';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'statistics-department',
    templateUrl: 'statistics-department.html',
    styleUrls: ['statistics-department.scss'],
})

export class StatisticsDepartmentPage {
    deptID: string;
    production: {
        value: number,
        target: number
    };
    billing: {
        value: number,
        target: number
    };
    members: {
        value: 0
    };
    general: {
        total_hour: {
            value: number,
            max: number
        },
        work_day: {
            value: number,
            max: number
        },
        active_emp: {
            value: number,
            max: number
        },
        off_work_emp: {
            value: number,
            max: number
        },
        vacation_emp: {
            value: number,
            max: number
        }
    };
    task: {
        ended: number,
        active: number,
        pause: number,
        cancel: number
    };
    user_total: {
        production: number,
        hour: number,
        hour_rate: number,
        result: number
    };
    userList: [];
    stat_opt: number;
    stat_times: number;

    constructor(private _router: Router, private alertCtrl: AlertController, private _route: ActivatedRoute,
        private utilService: UtilService, private deptService: DepartmentService) {
        this.deptID = this._route.snapshot.params['deptID'];

        this.production = { value: 0, target: 0 };
        this.billing = { value: 0, target: 0 };
        this.members = { value: 0 };
        this.general = {
            total_hour: {
                value: 0,
                max: 0
            },
            work_day: {
                value: 0,
                max: 0
            },
            active_emp: {
                value: 0,
                max: 0
            },
            off_work_emp: {
                value: 0,
                max: 0
            },
            vacation_emp: {
                value: 0,
                max: 0
            }
        };

        this.task = {
            ended: 0,
            active: 0,
            pause: 0,
            cancel: 0
        };

        this.userList = [];

        this.user_total = {
            production: 0,
            hour: 0,
            hour_rate: 0,
            result: 0
        };

        this.stat_opt = 0;
        this.stat_times = 1;

        this.getStatisticsInfo({
            id: this.deptID
        });
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
            value = this.production.value;
        } else {
            header = 'Change Billing';
            value = this.billing.value;
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
                self.production = o.department.production;
                self.billing = o.department.billing;
                self.utilService.showSuccessToast('Information is successfully updated');
            } else {
                self.utilService.showErrorToast(o.message);
            }
        }, (error) => {
            self.utilService.closeLoading();
            self.utilService.showErrorToast(error.message);
        });
    }

    async getStatisticsInfo(data: any) {
        await this.utilService.showLoading();
        const self = this;
        this.deptService.getStatisticsInfoByID(data).then(async function (o) {
            await self.utilService.closeLoading();
            if (o.success) {
                self.production = o.data.production;
                self.billing = o.data.billing;
                self.members = o.data.members;
                self.general = o.data.general;
                self.task = o.data.task;
                self.userList = o.data.employeeList;
                self.getUserTotal(self.userList);
            } else {
                self.utilService.showErrorToast(o.message);
            }
        }, (error) => {
            self.utilService.closeLoading();
            self.utilService.showErrorToast(error.message);
        });
    }

    getUserTotal(userList: any) {
        this.user_total = {
            production: 0,
            hour: 0,
            hour_rate: 0,
            result: 0
        };

        for (const user of userList) {
            this.user_total.production += user.production;
            this.user_total.hour += user.hour;
            this.user_total.hour_rate += user.hour_rate;
            this.user_total.result += user.result;
        }

        this.user_total.hour_rate = this.user_total.hour_rate / userList.length;
    }

    changeStatOption(opt: number) {
        this.stat_opt = opt;
        switch (this.stat_opt) {
            case 0:
                this.stat_times = 1;
                break;
            case 1:
                this.stat_times = 7;
                break;
                break;
            case 2:
                this.stat_times = 30;
                break;
            case 3:
                this.stat_times = 360;
                break;
        }
    }
}
