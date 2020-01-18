import { TaskService } from './../../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { DepartmentService } from './../../../services/department.service';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from './../../../services/user.service';
import * as moment from 'moment';

@Component({
    selector: 'edit-task',
    templateUrl: 'edit-task.html',
    styleUrls: ['edit-task.scss'],
})

export class EditTaskPage {
    yearList: Array<number>;
    monthList: Array<number>;
    dayList: Array<number>;
    date: {
        year: number;
        month: number;
        day: number;
    };

    task: {
        id: string,
        title: string,
        description: string,
        status: number,
        alert: boolean
    };

    constructor(private _router: Router, private _route: ActivatedRoute, private userService: UserService,
        private deptService: DepartmentService, private taskService: TaskService, private utilService: UtilService) {
        let id = this._route.snapshot.params['id'];

        this.yearList = new Array<number>();
        this.monthList = new Array<number>();
        this.dayList = new Array<number>();

        this.task = {
            id: id,
            title: '',
            description: '',
            status: 0,
            alert: false
        };

        const d = new Date();

        this.date = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };

        for (let i = 1900; i <= 2050; i++) {
            this.yearList.push(i);
        }

        for (let i = 1; i <= 12; i++) {
            this.monthList.push(i);
        }

        const daysCountInMonth = new Date(this.date.year, this.date.month, 0).getDate();

        for (let i = 1; i <= daysCountInMonth; i++) {
            this.dayList.push(i);
        }

        this.getTaskInfo({
            id: id
        });
    }

    async getTaskInfo(data: any) {
        await this.utilService.showLoading();
        const self = this;
        this.taskService.getTask(data).then(async function (o) {
            await self.utilService.closeLoading();
            if (o.success) {
                self.task = {
                    id: o.task.id,
                    title: o.task.title,
                    description: o.task.description,
                    alert: o.task.alert,
                    status: o.task.status
                }

                const d = moment(o.task.end_date).toDate();

                self.date = {
                    year: d.getFullYear(),
                    month: d.getMonth() + 1,
                    day: d.getDate(),
                };
            } else {
                self.utilService.showErrorToast(o.message);
            }
        }, (error) => {
            self.utilService.closeLoading();
            self.utilService.showErrorToast(error.message);
        });
    }


    changeDate() {
        const daysCountInMonth = new Date(this.date.year, this.date.month, 0).getDate();
        this.dayList = [];
        const self = this;
        setTimeout(() => {
            for (let i = 1; i <= daysCountInMonth; i++) {
                self.dayList.push(i);
            }

            self.date.day = 1;
        }, 100);
    }

    async send() {
        if (this.task.title === '' || this.task.description === '') {
            this.utilService.showErrorToast('Please fill in blanks.');
            return;
        }

        await this.utilService.showLoading();

        const self = this;
        const d = new Date(this.date.year, this.date.month - 1, this.date.day);

        this.taskService.updateTask({
            id: this.task.id,
            title: this.task.title,
            description: this.task.description,
            alert: this.task.alert,
            status: this.task.status,
            date: moment(d).format('YYYY-MM-DD')
        }).then(async function (o) {
            await self.utilService.closeLoading();
            if (o.success) {
                self.utilService.showSuccessToast('The task is successfully updated. ');
                self._router.navigate(['main/general-calendar']);
            } else {
                self.utilService.showErrorToast(o.message);
            }
        }, (error) => {
            this.utilService.closeLoading();
            this.utilService.showErrorToast(error.message);
        });
    }
}
