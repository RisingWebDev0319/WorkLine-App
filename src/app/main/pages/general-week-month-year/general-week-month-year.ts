import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { TimeService } from 'src/app/services/time.service';
import { UtilService } from 'src/app/services/util.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'general-week-month-year',
  templateUrl: 'general-week-month-year.html',
  styleUrls: ['general-week-month-year.scss'],
})

export class GeneralWeekMonthYearPage {
  eventSource: any;
  calendar = {
    mode: 'week',
    currentDate: new Date(),
    formatHourColumn: 'h a',
    formatWeekViewDayHeader: 'EEE',
    startHour: 0,
    endHour: 24,
    lockSwipes: true,
    startingDayWeek: 1,
  };

  public general: any = {
    hours: 0,
    days: 0,
    target_state: 0,
    target_attach: 0,
    tasks: [],
    users: []
  };

  public date: any = {
    start_date: '',
    end_date: ''
  };

  public deptList: any = [];
  public type: number;
  public id: any;

  constructor(private _router: Router, private _route: ActivatedRoute, private utilService: UtilService, private timeService: TimeService) {
    const d = moment(this._route.snapshot.params['date']);

    this.type = this._route.snapshot.params['type'] ? this._route.snapshot.params['type'] : 0;
    this.id = this._route.snapshot.params['id'] ? this._route.snapshot.params['id'] : '';

    const start_date = this.getFirstDateOfWeek(d);
    const end_date = start_date.clone().add(6, 'days');

    this.calendar.currentDate = new Date(start_date.toDate());

    this.date.start_date = start_date.format('YYYY-MM-DD');
    this.date.end_date = end_date.format('YYYY-MM-DD');

    this.getWeekDataForGeneral({
      start_date: this.date.start_date,
      end_date: this.date.end_date
    });
  }

  async getWeekDataForGeneral(month: any) {
    await this.utilService.showLoading();
    const self = this;
    this.timeService.getWeekDataForGeneral(month).then(async function (o) {
      await self.utilService.closeLoading();
      if (o.success) {
        self.general = o.data.general;
        self.deptList = o.data.deptList;

        if (self.type === 0) {
          self.getWeekTimeDataForGeneral({
            start_date: self.date.start_date,
            end_date: self.date.end_date,
            mode: 0,
            id: 0
          });
        } else if (self.type === 1) {       // Department
          self.getWeekTimeDataForGeneral({
            start_date: self.date.start_date,
            end_date: self.date.end_date,
            mode: 3,
            id: this.id
          });
        } else if (self.type === 2) {       // User
          self.getWeekTimeDataForGeneral({
            start_date: self.date.start_date,
            end_date: self.date.end_date,
            mode: 2,
            id: this.id
          });
        }
      } else {
        self.utilService.showErrorToast(o.message);
      }
    }, (error) => {
      self.utilService.closeLoading();
      self.utilService.showErrorToast(error.message);
    });
  }

  onSelectTask($event): void {
    this.getWeekTimeDataForGeneral({
      start_date: this.date.start_date,
      end_date: this.date.end_date,
      mode: 1,
      id: $event.id
    });
  }

  onSelectUser($event): void {
    this.getWeekTimeDataForGeneral({
      start_date: this.date.start_date,
      end_date: this.date.end_date,
      mode: 2,
      id: $event.id
    });
  }

  onSelectDept($event): void {
    this.getWeekTimeDataForGeneral({
      start_date: this.date.start_date,
      end_date: this.date.end_date,
      mode: 3,
      id: $event.id
    });
  }

  async getWeekTimeDataForGeneral(month: any) {
    await this.utilService.showLoading();
    const self = this;
    this.timeService.getWeekTimeDataForGeneral(month).then(async function (o) {
      await self.utilService.closeLoading();
      if (o.success) {
        self.eventSource = self.createEvents(o.data);
      } else {
        self.utilService.showErrorToast(o.message);
      }
    }, (error) => {
      self.utilService.closeLoading();
      self.utilService.showErrorToast(error.message);
    });
  }

  getFirstDateOfWeek(d: any): any {
    return d.subtract(d.day() === 0 ? 6 : d.day() - 1, 'days');
  }

  createEvents(dateList: any) {
    const events = [];

    for (const date in dateList) {
      if (date) {
        const m = moment(date);
        const hours = dateList[date];

        hours.map((hour) => {
          const startTime = new Date(m.year(), m.month(), m.date(), hour, 0);
          const endTime = new Date(m.year(), m.month(), m.date(), (hour + 1) % 24, 0);

          events.push({
            startTime: startTime,
            endTime: endTime,
            allDay: false,
            type: 'work'
          });
        });
      }
    }

    return events;
  }
}
