import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'statistics-employee',
    templateUrl: 'statistics-employee.html',
    styleUrls: ['statistics-employee.scss'],
})

export class StatisticsEmployeePage {
    empID: any;
    production: {
        value: number,
        target: number
    };
    billing: {
        value: number,
        target: number
    };
    time: {
        total_hour: {
            value: number,
            max: number
        },
        work_day: {
            value: number,
            max: number
        },
        holiday: {
            value: number,
            max: number
        },
        off_work: {
            value: number,
            max: number
        },
        personal_day: {
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
    stat_opt: number;
    stat_times: number;

    constructor(private _router: Router, private _route: ActivatedRoute, private utilService: UtilService,
        private taskService: TaskService, private userService: UserService, private alertCtrl: AlertController) {
        this.empID = this._route.snapshot.params['empID'];
        this.production = { value: 0, target: 0 };
        this.billing = { value: 0, target: 0 };
        this.time = {
            total_hour: {
                value: 0,
                max: 0
            },
            work_day: {
                value: 0,
                max: 0
            },
            holiday: {
                value: 0,
                max: 0
            },
            off_work: {
                value: 0,
                max: 0
            },
            personal_day: {
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

        this.stat_opt = 0;
        this.stat_times = 1;

        this.getStatisticsInfo({
            id: this.empID
        });
    }

    async getStatisticsInfo(data: any) {
        await this.utilService.showLoading();
        const self = this;
        this.userService.getStatisticsInfoByID(data).then(async function (o) {
            await self.utilService.closeLoading();
            if (o.success) {
                self.production = o.data.production;
                self.billing = o.data.billing;
                self.time = o.data.time;
                self.task = o.data.task;
            } else {
                self.utilService.showErrorToast(o.message);
            }
        }, (error) => {
            self.utilService.closeLoading();
            self.utilService.showErrorToast(error.message);
        });
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
                            id: self.empID,
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
        this.userService.updateInfo(data).then(async function (o) {
            await self.utilService.closeLoading();
            if (o.success) {
                self.production = o.user.production;
                self.billing = o.user.billing;
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
