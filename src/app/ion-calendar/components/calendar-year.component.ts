import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarMonth, CalendarModalOptions } from '../calendar.model';
import { CalendarService } from '../services/calendar.service';
import * as moment from 'moment';

@Component({
  selector: 'calendar-year-component',
  styleUrls: ['./calendar-year.component.scss'],
  template: `
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-label class="year-title">{{ _yearFormat(_d.defaultDate) }}</ion-label>
        </ion-col>
      </ion-row>
      <ion-row>
          <ng-template ngFor let-month [ngForOf]="calendarMonths" [ngForTrackBy]="trackByIndex" let-i="index">
            <ion-col size="4">
              <div class="month-box" [attr.id]="'month-' + i" (click)="onMonthSelected(i)">
                <h4 class="text-center month-title {{ _monthFormat(month.original.date) == _monthFormat(_d.defaultDate) ? 'active' : '' }}">
                  {{ _monthFormat(month.original.date) }}
                </h4>
                <ion-calendar-month 
                  class="calendar-month"
                  [month]="month"
                  [pickMode]="_d.pickMode"
                  [isSaveHistory]="_d.isSaveHistory"
                  [id]="_d.id"
                  [color]="_d.color">
                </ion-calendar-month>
              </div>
            </ion-col>
          </ng-template>
      </ion-row>
    </ion-grid>
  `,
})
export class CalendarYearComponent implements OnInit {
  @Input()
  options: CalendarModalOptions;
  @Output()
  select: EventEmitter<Date> = new EventEmitter();

  calendarMonths: Array<CalendarMonth>;
  _d: CalendarModalOptions;
  constructor(
    public calSvc: CalendarService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this._d = this.calSvc.safeOpt(this.options);
    this._d.showAdjacentMonthDay = false;
    this._d.from = new Date(this._d.defaultDate);
    this._d.from.setMonth(0);
    this._d.monthFormat = 'MMM';

    this.calendarMonths = this.calSvc.createMonthsByPeriod(
      moment(this._d.from).valueOf(),
      12,
      this._d
    );
  }

  onMonthSelected(monthIndex) {
    const date = new Date(this._d.defaultDate);
    date.setMonth(monthIndex);
    date.setDate(1);
    this.select.emit(date);
  }

  trackByIndex(index: number, momentDate: CalendarMonth): number {
    return momentDate.original ? momentDate.original.time : index;
  }

  _monthFormat(date: number): string {
    return moment(date).format(this._d.monthFormat.replace(/y/g, 'Y'));
  }

  _yearFormat(date: number): string {
    return moment(date).format('YYYY');
  }
}