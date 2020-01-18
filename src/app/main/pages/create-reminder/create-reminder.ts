import { ReminderService } from './../../../services/reminder.service';
import { UtilService } from './../../../services/util.service';
import { Component, AfterViewInit } from '@angular/core';

import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
    selector: 'create-reminder',
    templateUrl: './create-reminder.html',
    styleUrls: ['./create-reminder.scss'],
})

export class CreateReminderPage {
    yearList: Array<number>;
    monthList: Array<number>;
    dayList: Array<number>;
    hourList: Array<number>;
    minList: Array<number>;

    date: {
        year: number;
        month: number;
        day: number;
        hour: number;
        min: number;
        apm: number;                            //0: AM 1: PM
    };

    reminder: {
        title: string,
        description: string,
        alert: boolean
    }

    constructor(private _router: Router, private reminderService: ReminderService, private utilService: UtilService) {
        this.yearList = new Array<number>();
        this.monthList = new Array<number>();
        this.dayList = new Array<number>();
        this.hourList = new Array<number>();
        this.minList = new Array<number>();

        const d = new Date();

        this.date = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate(),
            hour: d.getHours() % 12,
            min: d.getMinutes(),
            apm: Math.floor(d.getHours() / 12),
        };

        this.reminder = {
            title: '',
            description: '',
            alert: false
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

        for (let i = 0; i < 12; i++) {
            this.hourList.push(i);
        }

        for (let i = 0; i <= 59; i++) {
            this.minList.push(i);
        }
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

    async accept() {
        if (this.reminder.title === '' || this.reminder.description === '') {
            this.utilService.showErrorToast('Please fill in blanks.');
            return;
        }

        await this.utilService.showLoading();

        const self = this;
        const d = new Date(this.date.year, this.date.month - 1, this.date.day, this.date.apm * 12 + this.date.hour, this.date.min);

        this.reminderService.addReminder({
            title: this.reminder.title,
            description: this.reminder.description,
            alert: this.reminder.alert,
            date: moment(d).format('YYYY-MM-DD HH:mm:ss')
        }).then(async function (o) {
            await self.utilService.closeLoading();
            if (o.success) {
                self.utilService.showSuccessToast('The reminder is successfully registered. ');
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
