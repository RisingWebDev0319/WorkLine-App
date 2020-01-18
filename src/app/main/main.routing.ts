import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { PersonSummaryPage } from './pages/person-summary/person-summary';
import { PersonalCalendarPage } from './pages/personal-calendar/personal-calendar';
import { PersonalMonthYearPage } from './pages/personal-month-year/personal-month-year';
import { PersonalWeekMonthYearPage } from './pages/personal-week-month-year/personal-week-month-year';

import { GeneralCalendarPage } from './pages/general-calendar/general-calendar';
import { GeneralMonthYearPage } from './pages/general-month-year/general-month-year';
import { GeneralWeekMonthYearPage } from './pages/general-week-month-year/general-week-month-year';
import { StatisticsPage } from './pages/statistics/statistics';
import { StatisticsDepartmentPage } from './pages/statistics-department/statistics-department';
import { StatisticsEmployeePage } from './pages/statistics-employee/statistics-employee';

import { CreateReminderPage } from './pages/create-reminder/create-reminder';
import { CreateTaskPage } from './pages/create-task/create-task';
import { EditReminderPage } from './pages/edit-reminder/edit-reminder';
import { EditTaskPage } from './pages/edit-task/edit-task';
import { CreateNewDatePage } from './pages/create-new-date/create-new-date';
import { DepartmentPage } from './pages/department/department';
import { EmployeePage } from './pages/employee/employee';

import { ChatMessageEmployeePage } from './pages/chat-message-employee/chat-mssage-employee';
import { ChatMessagePage } from './pages/chat-message/chat-message';
import { AuthGuard } from './../guards/auth.guard';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'main',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'person-summary', pathMatch: 'full' },
            { path: 'personal-calendar', component: PersonalCalendarPage },
            { path: 'personal-month-year', component: PersonalMonthYearPage },
            { path: 'personal-week-month-year', component: PersonalWeekMonthYearPage },
            { path: 'person-summary', component: PersonSummaryPage },
            { path: 'general-calendar', component: GeneralCalendarPage },
            { path: 'general-month-year', component: GeneralMonthYearPage },
            { path: 'general-week-month-year', component: GeneralWeekMonthYearPage },
            { path: 'create-reminder', component: CreateReminderPage },
            { path: 'create-task', component: CreateTaskPage },
            { path: 'create-new-date', component: CreateNewDatePage },
            { path: 'edit-reminder', component: EditReminderPage },
            { path: 'edit-task', component: EditTaskPage },
            { path: 'department', component: DepartmentPage },
            { path: 'employee', component: EmployeePage },
            { path: 'statistics', component: StatisticsPage },
            { path: 'statistics-employee', component: StatisticsEmployeePage },
            { path: 'statistics-department', component: StatisticsDepartmentPage },
            { path: 'chat-message', component: ChatMessagePage },
            { path: 'chat-message-employee', component: ChatMessageEmployeePage },
        ]
    }
];

export const MainRouting = RouterModule.forChild(routes);