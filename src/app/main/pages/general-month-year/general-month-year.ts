import { CalendarComponentOptions } from './../../../ion-calendar/calendar.model';
import { Component } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { TimeService } from 'src/app/services/time.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'general-month-year',
  templateUrl: 'general-month-year.html',
  styleUrls: ['general-month-year.scss'],
})

export class GeneralMonthYearPage {
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
    target_attach: 0,
    tasks: [],
    users: []
  };

  public deptList: any = [];

  constructor(private _router: Router, private _route: ActivatedRoute, private utilService: UtilService, private timeService: TimeService) {
    this.date = this._route.snapshot.params['date'];
    this.calendarOptions.from = new Date(this.date.toString());

    let m = moment(this.date.toString());
    m.date((new Date(m.year(), m.month() + 1, 0).getDate()));

    this.getMonthDataForGeneral({
      start_date: this.date,
      end_date: m.format('YYYY-MM-DD')
    });
  }

  async getMonthDataForGeneral(month: any) {
    await this.utilService.showLoading();
    const self = this;
    this.timeService.getMonthDataForGeneral(month).then(async function (o) {
      await self.utilService.closeLoading();
      if (o.success) {
        self.general = o.data.general;
        self.deptList = o.data.deptList;
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
    this._router.navigate(['main/general-week-month-year', { date: d }]);
  }
}
