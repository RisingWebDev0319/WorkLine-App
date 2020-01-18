import { Router } from '@angular/router';
import { CalendarModalOptions } from './../../../ion-calendar/calendar.model';
import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'personal-calendar',
  templateUrl: 'personal-calendar.html',
  styleUrls: ['personal-calendar.scss'],
})

export class PersonalCalendarPage {
  public calendarOptions: CalendarModalOptions = {
    defaultDate: new Date(),
    canBackwardsSelected: true
  };

  constructor(private _router: Router) {
  }

  selectMonth(date): void {
    const d = moment(date).format('YYYY-MM-DD');
    this._router.navigate(['main/personal-month-year', { date: d }]);
  }
}
