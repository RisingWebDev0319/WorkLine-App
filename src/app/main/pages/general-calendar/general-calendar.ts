import { CalendarModalOptions } from './../../../ion-calendar/calendar.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'general-calendar',
  templateUrl: 'general-calendar.html',
  styleUrls: ['general-calendar.scss'],
})

export class GeneralCalendarPage {
  public calendarOptions: CalendarModalOptions = {
    defaultDate: new Date(),
    canBackwardsSelected: true
  };

  constructor(private _router: Router) {
  }

  selectMonth(date): void {
    const d = moment(date).format('YYYY-MM-DD');
    this._router.navigate(['main/general-month-year', { date: d }]);
  }
}
