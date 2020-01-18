import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ReminderService } from 'src/app/services/reminder.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'person-summary',
  templateUrl: 'person-summary.html',
  styleUrls: ['person-summary.scss'],
})

export class PersonSummaryPage {
  reminderList: [any];
  user: {
    name: String,
    position: String,
    status: String,
    department: String,
    avatar: String
  };

  constructor(private _router: Router,private utilService: UtilService, private userService: UserService, private reminderService: ReminderService) {
    this.user = {
      name: '',
      position: '',
      status: '',
      department: '',
      avatar: ''
    };

    this.init();
  }

  async init() {
    await this.utilService.showLoading();

    const self = this;
    this.reminderService.topReminders({}).then(async function (o) {
      self.utilService.closeLoading();
      if (o.success) {
        self.reminderList = o.reminders;
        const u = self.userService.getUser();
        self.user.name = u.name;
        self.user.position = u.position.name;
        self.user.department = u.department.name;
        self.user.avatar = u.avatar === '' ? '../../assets/imgs/main/user.jpg' : u.avatar;
        self.user.status = self.userService.getStatusLabel(u.status);
      } else {
        self.utilService.showErrorToast(o.message);
      }
    }, (error) => {
      this.utilService.closeLoading();
      this.utilService.showErrorToast(error.message);
    });
  }

  getDateString(d: any) {
    const m = moment(d);
    return m.format('MMM, D');
  }

  getTimeString(d: any) {
    const m = moment(d);
    return m.format('hh : mm A');
  }

  editReminder(id: any) {
    this._router.navigate(['main/edit-reminder', { id: id }]);
  }
}
