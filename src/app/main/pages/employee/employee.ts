import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

import * as moment from 'moment';

@Component({
    selector: 'employee',
    templateUrl: 'employee.html',
    styleUrls: ['employee.scss'],
})
export class EmployeePage {
    empID: any;
    user: {
        name: string,
        position: string,
        department: string,
        status: string,
        avatar: string
    };
    taskList: [any];
    alertOption: number;

    constructor(private _router: Router, private _route: ActivatedRoute, private utilService: UtilService,
        private taskService: TaskService, private userService: UserService) {
        this.empID = this._route.snapshot.params['empID'];
        this.user = {
            name: '',
            position: '',
            department: '',
            status: '',
            avatar: ''
        };

        this.getTasksAndInfo({
            id: this.empID
        });
    }

    async getTasksAndInfo(data: any) {
        await this.utilService.showLoading();
        const self = this;
        this.userService.getTasksAndInfoByUserID(data).then(async function (o) {
            await self.utilService.closeLoading();
            if (o.success) {
                self.user = {
                    name: o.data.user.name,
                    position: o.data.user.position.name,
                    department: o.data.user.department.name,
                    status: self.userService.getStatusLabel(o.data.user.status),
                    avatar: o.data.user.avatar === '' ? '../../assets/imgs/main/user.jpg' : o.data.user.avatar
                };
                self.taskList = o.data.tasks;
            } else {
                self.utilService.showErrorToast(o.message);
            }
        }, (error) => {
            self.utilService.closeLoading();
            self.utilService.showErrorToast(error.message);
        });

        this.alertOption = 0;
    }

    async changeAlertOption() {
        if (this.alertOption > 0) {

            await this.utilService.showLoading();
            const self = this;
            this.userService.sendAlertNotification({
                id: this.empID,
                alert: this.alertOption
            }).then(async function (o) {
                await self.utilService.closeLoading();
                if (o.success) {
                    self.utilService.showSuccessToast('The notification is successfully sent');
                } else {
                    self.utilService.showErrorToast(o.message);
                }
            }, (error) => {
                self.utilService.closeLoading();
                self.utilService.showErrorToast(error.message);
            });
        }
    }

    openStatisticsEmployee() {
        this._router.navigate(['main/statistics-employee', { empID: this.empID, empName: this.user.name }]);
    }

    getDateString(d: any) {
        const m = moment(d);
        return m.format('MMM, D');
    }

    showEmployeeCalendar() {
        const d = moment((new Date())).format('YYYY-MM-DD');
        this._router.navigate(['main/general-week-month-year', { date: d, type: 2, id: this.empID }]);
    }

    showEmployeeSendMessage() {
        this._router.navigate(['main/chat-message-employee', { empID: this.empID, empName: this.user.name }]);
    }

    editTask(id) {
        this._router.navigate(['main/edit-task', { id: id }]);
    }
}
