import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { MainRouting } from './main.routing';
import { MainComponent } from './main.component';

import { RoundProgressModule } from 'src/app/round-progress';
import { IonCalendarModule } from 'src/app/ion-calendar/calendar.module';
import { NgCalendarModule } from 'src/app/ng-calendar/calendar.module';

import { AccordionComponent } from './components/accordion/accordion.component';
import { LayoutToolBarComponent } from './components/layout-toolbar/layout-toolbar.component';

import { PersonSummaryPage } from './pages/person-summary/person-summary';
import { PersonalCalendarPage } from './pages/personal-calendar/personal-calendar';
import { PersonalMonthYearPage } from './pages/personal-month-year/personal-month-year';
import { PersonalWeekMonthYearPage } from './pages/personal-week-month-year/personal-week-month-year';

import { GeneralCalendarPage } from './pages/general-calendar/general-calendar';
import { GeneralMonthYearPage } from './pages/general-month-year/general-month-year';
import { GeneralWeekMonthYearPage } from './pages/general-week-month-year/general-week-month-year';

import { StatisticsPage } from './pages/statistics/statistics';
import { StatisticsEmployeePage } from './pages/statistics-employee/statistics-employee';
import { StatisticsDepartmentPage } from './pages/statistics-department/statistics-department';

import { CreateReminderPage } from './pages/create-reminder/create-reminder';
import { CreateTaskPage } from './pages/create-task/create-task';
import { CreateNewDatePage } from './pages/create-new-date/create-new-date';
import { EditReminderPage } from './pages/edit-reminder/edit-reminder';
import { EditTaskPage } from './pages/edit-task/edit-task';
import { DepartmentPage } from './pages/department/department';
import { EmployeePage } from './pages/employee/employee';
import { ChatMessagePage } from './pages/chat-message/chat-message';
import { ChatMessageEmployeePage } from './pages/chat-message-employee/chat-mssage-employee';

import { ChatService } from '../services/chat.service';
import { UserService } from './../services/user.service';
import { ReminderService } from './../services/reminder.service';
import { DepartmentService } from './../services/department.service';
import { TaskService } from './../services/task.service';
import { DateService } from './../services/date.service';
import { AuthGuard } from './../guards/auth.guard';
import { UtilService } from '../services/util.service';
import { TimeService } from '../services/time.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainRouting,
    IonCalendarModule,
    NgCalendarModule,
    RoundProgressModule,
    HttpClientModule,
  ],
  declarations: [
    MainComponent,
    AccordionComponent,
    LayoutToolBarComponent,
    PersonSummaryPage,
    PersonalCalendarPage,
    PersonalMonthYearPage,
    PersonalWeekMonthYearPage,
    GeneralCalendarPage,
    GeneralMonthYearPage,
    GeneralWeekMonthYearPage,
    StatisticsPage,
    CreateReminderPage,
    CreateTaskPage,
    CreateNewDatePage,
    EditReminderPage,
    EditTaskPage,
    DepartmentPage,
    EmployeePage,
    StatisticsEmployeePage,
    StatisticsDepartmentPage,
    ChatMessagePage,
    ChatMessageEmployeePage
  ],
  providers: [
    ChatService,
    UserService,
    ReminderService,
    DepartmentService,
    TaskService,
    DateService,
    AuthGuard,
    TimeService,
    UtilService,
    Geolocation
  ]
})

export class MainModule { }
