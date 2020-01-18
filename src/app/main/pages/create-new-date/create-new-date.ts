import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from './../../../services/user.service';
import { DateService } from './../../../services/date.service';
import * as moment from 'moment';

@Component({
    selector: 'create-new-date',
    templateUrl: './create-new-date.html',
    styleUrls: ['./create-new-date.scss'],
})
export class CreateNewDatePage {
    start_YearList: Array<number>;
    start_MonthList: Array<number>;
    start_DayList: Array<number>;
    end_YearList: Array<number>;
    end_MonthList: Array<number>;
    end_DayList: Array<number>;
    userList: Array<any>;

    start_date: {
        year: number;
        month: number;
        day: number;
    };

    end_date: {
        year: number;
        month: number;
        day: number;
    }

    dateData: {
        comments: string,
        reason: number,
        user: string,
        status: number,
        pending: boolean
    };

    constructor(private _router: Router, private userService: UserService,
        private dateService: DateService, private utilService: UtilService) {
        this.start_YearList = new Array<number>();
        this.start_MonthList = new Array<number>();
        this.start_DayList = new Array<number>();
        this.end_YearList = new Array<number>();
        this.end_MonthList = new Array<number>();
        this.end_DayList = new Array<number>();
        this.userList = Array<any>();

        this.dateData = {
            comments: '',
            reason: 0,
            user: '',
            status: 0,
            pending: false
        };

        const d = new Date();

        this.start_date = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };

        this.end_date = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };

        for (let i = 1900; i <= 2050; i++) {
            this.start_YearList.push(i);
            this.end_YearList.push(i);
        }

        for (let i = 1; i <= 12; i++) {
            this.start_MonthList.push(i);
            this.end_MonthList.push(i);
        }

        const daysCountInMonth = new Date(this.start_date.year, this.start_date.month, 0).getDate();

        for (let i = 1; i <= daysCountInMonth; i++) {
            this.start_DayList.push(i);
            this.end_DayList.push(i);
        }

        this.getAllEmployees();
    }

    async getAllEmployees() {
        await this.utilService.showLoading();

        const self = this;

        this.userList = [];
        this.userService.getAllEmployees()
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
                            self.dateData.user = self.userList[0].id;
                        } else {
                            self.userList = [];
                            self.dateData.user = '';
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

    changeStartDate() {
        const daysCountInMonth = new Date(this.start_date.year, this.start_date.month, 0).getDate();
        this.start_DayList = [];
        const self = this;
        setTimeout(() => {
            for (let i = 1; i <= daysCountInMonth; i++) {
                self.start_DayList.push(i);
            }

            self.start_date.day = 1;
        }, 100);
    }

    changeEndDate() {
        const daysCountInMonth = new Date(this.end_date.year, this.end_date.month, 0).getDate();
        this.end_DayList = [];
        const self = this;
        setTimeout(() => {
            for (let i = 1; i <= daysCountInMonth; i++) {
                self.end_DayList.push(i);
            }

            self.end_date.day = 1;
        }, 100);
    }

    async send() {
        if (this.dateData.comments === '') {
            this.utilService.showErrorToast('Please fill in blanks.');
            return;
        }

        await this.utilService.showLoading();

        const self = this;
        const startDate = new Date(this.start_date.year, this.start_date.month - 1, this.start_date.day);
        const endDate = new Date(this.end_date.year, this.end_date.month - 1, this.end_date.day);

        this.dateService.addDate({
            comments: this.dateData.comments,
            pending: this.dateData.pending,
            reason: this.dateData.reason,
            user: this.dateData.user,
            startDate: moment(startDate).format('YYYY-MM-DD'),
            endDate: moment(endDate).format('YYYY-MM-DD')
        }).then(async function (o) {
            await self.utilService.closeLoading();
            if (o.success) {
                self.utilService.showSuccessToast('The date is successfully registered. ');
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
