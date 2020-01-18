import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { UtilService } from 'src/app/services/util.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'personal-week-month-year',
  templateUrl: 'personal-week-month-year.html',
  styleUrls: ['personal-week-month-year.scss'],
})

export class PersonalWeekMonthYearPage {
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
    target_attach: 0
  };

  public taskList: any = [];

  public date: any = {
    start_date: '',
    end_date: ''
  };


  constructor(private _router: Router, private _route: ActivatedRoute, private utilService: UtilService, private timeService: TimeService) {
    const d = moment(this._route.snapshot.params['date']);

    this.calendar.currentDate = new Date(this.getFirstDateOfWeek(d).toDate());

    const start_date = this.getFirstDateOfWeek(d);
    const end_date = start_date.clone().add(6, 'days');

    this.calendar.currentDate = new Date(start_date.toDate());

    this.date.start_date = start_date.format('YYYY-MM-DD');
    this.date.end_date = end_date.format('YYYY-MM-DD');

    this.getWeekDataForPersonal({
      start_date: this.date.start_date,
      end_date: this.date.end_date
    });
  }

  async getWeekDataForPersonal(month: any) {
    await this.utilService.showLoading();
    const self = this;
    this.timeService.getWeekDataForPersonal(month).then(async function (o) {
      await self.utilService.closeLoading();
      if (o.success) {
        self.general = o.data.general;
        self.taskList = o.data.taskList;

        if (self.taskList.length > 0) {
          self.getWeekTimeDataForPersonal({
            start_date: self.date.start_date,
            end_date: self.date.end_date,
            mode: 1,
            id: self.taskList[0].id
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

  async getWeekTimeDataForPersonal(month: any) {
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

  getFirstDateOfWeek(d): any {
    return d.subtract(d.day() == 0 ? 6 : d.day() - 1, 'days');
  }

  onSelectTask($event): void {
    this.getWeekTimeDataForPersonal({
      start_date: this.date.start_date,
      end_date: this.date.end_date,
      mode: 1,
      id: $event.id
    });
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
