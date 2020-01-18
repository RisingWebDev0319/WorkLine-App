import { UtilService } from 'src/app/services/util.service';
import { TimeService } from 'src/app/services/time.service';
import { CalendarComponentOptions } from './../../../ion-calendar/calendar.model';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'personal-month-year',
  templateUrl: 'personal-month-year.html',
  styleUrls: ['personal-month-year.scss'],
})

export class PersonalMonthYearPage {
  public date: String = '2019-01-01';
  public calendarOptions: CalendarComponentOptions = {
    showToggleButtons: false,
    showMonthPicker: false,
    showAdjacentMonthDay: false,
    weekStart: 1,
    disableWeeks: [0, 6]
  };

  public general: any = {
    hours: 0,
    days: 0,
    target_state: 0,
    target_attach: 0
  };

  public taskList: any = [];

  constructor(private _router: Router, private _route: ActivatedRoute, private utilService: UtilService, private timeService: TimeService) {
    this.date = this._route.snapshot.params['date'];
    this.calendarOptions.from = new Date(this.date.toString());

    let m = moment(this.date.toString());
    m.date((new Date(m.year(), m.month() + 1, 0).getDate()));

    this.getMonthDataForPersonal({
      start_date: this.date,
      end_date: m.format('YYYY-MM-DD')
    });
  }

  async getMonthDataForPersonal(month: any) {
    await this.utilService.showLoading();
    const self = this;
    this.timeService.getMonthDataForPersonal(month).then(async function (o) {
      await self.utilService.closeLoading();
      if (o.success) {
        self.general = o.data.general;
        self.taskList = o.data.taskList;
      } else {
        self.utilService.showErrorToast(o.message);
      }
    }, (error) => {
      self.utilService.closeLoading();
      self.utilService.showErrorToast(error.message);
    });
  }

  onSelectDate($event): void {
    const d = moment($event.time).format('YYYY-MM-DD');
    this._router.navigate(['main/personal-week-month-year', { date: d }]);
  }

}
