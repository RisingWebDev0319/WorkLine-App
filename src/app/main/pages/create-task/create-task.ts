import { TaskService } from './../../../services/task.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { DepartmentService } from './../../../services/department.service';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from './../../../services/user.service';
import * as moment from 'moment';

@Component({
    selector: 'create-task',
    templateUrl: 'create-task.html',
    styleUrls: ['create-task.scss'],
})
export class CreateTaskPage {
    yearList: Array<number>;
    monthList: Array<number>;
    dayList: Array<number>;
    departmentList: Array<any>;
    userList: Array<any>;

    date: {
        year: number;
        month: number;
        day: number;
    };

    task: {
        title: string,
        description: string,
        department: string,
        user: string,
        status: number,
        alert: boolean
    };

    constructor(private _router: Router, private userService: UserService,
        private deptService: DepartmentService, private taskService: TaskService, private utilService: UtilService) {
        this.yearList = new Array<number>();
        this.monthList = new Array<number>();
        this.dayList = new Array<number>();
        this.departmentList = new Array<any>();
        this.userList = Array<any>();

        this.task = {
            title: '',
            description: '',
            department: '',
            user: '',
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

        this.userService.getUser().departments.map((department) => {
            this.departmentList.push({
                id: department._id,
                name: department.name
            });
        });

        if (this.departmentList.length > 0) {
            this.task.department = this.departmentList[0].id;
        } else {
            this.task.department = '';
        }

        this.getEmployeesForDept();
    }

    changeDept() {
        this.getEmployeesForDept();
    }

    async getEmployeesForDept() {
        await this.utilService.showLoading();

        const self = this;

        this.userList = [];
        this.deptService.getEmployeesForDept({ id: this.task.department })
            .then(async function (o) {
                await self.utilService.closeLoading();
                if (o.success) {
                    o.users.map((user) => {
                        self.userList.push({
                            id: user._id,
                            name: user.name
                        });
                    });

                    setTimeout(() => {
                        if (self.userList.length > 0) {
                            self.task.user = self.userList[0].id;
                        } else {
                            self.userList = [];
                            self.task.user = '';
                        }
                    }, 100);
                } else {
                    self.utilService.showErrorToast(o.message);
                }
            }, (error) => {
                this.utilService.closeLoading();
                this.utilService.showErrorToast(error.message);
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

        this.taskService.addTask({
            title: this.task.title,
            description: this.task.description,
            alert: this.task.alert,
            department: this.task.department,
            user: this.task.user,
            status: this.task.status,
            date: moment(d).format('YYYY-MM-DD')
        }).then(async function (o) {
            await self.utilService.closeLoading();
            if (o.success) {
                self.utilService.showSuccessToast('The task is successfully registered. ');
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
