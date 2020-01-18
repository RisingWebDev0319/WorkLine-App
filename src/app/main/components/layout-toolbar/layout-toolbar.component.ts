import { ActionSheetController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router, NavigationEnd, UrlTree, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';

import * as moment from 'moment';

@Component({
    selector: 'layout-toolbar',
    templateUrl: 'layout-toolbar.component.html',
    styleUrls: ['layout-toolbar.component.scss'],
})

export class LayoutToolBarComponent {
    public pageName: String = 'person-summary';
    public pageTitle: String = '';
    public isBackBtn: Boolean = false;
    public isPlusBtn: Boolean = false;
    public isSettingBtn: Boolean = false;
    public _onRouteChange: Subscription;

    constructor(private _router: Router, private sheetCtrl: ActionSheetController) {
        this._onRouteChange = this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const tree: UrlTree = this._router.parseUrl(event.urlAfterRedirects);
                const segment: UrlSegment = tree.root.children[PRIMARY_OUTLET].segments[1];
                if (segment) {
                    this.pageName = segment.path;
                    this.resetToolBarInfo(segment.parameters);
                }
            }
        });
        this.resetToolBarInfo(null);
    }

    plusClick(): void {
        switch (this.pageName) {
            case 'general-calendar':
                this.presentGeneralOptionSheet();
                break;
            case 'general-month-year':
                this.presentGeneralOptionSheet();
                break;
            case 'general-week-month-year':
                this.presentGeneralOptionSheet();
                break;
            case 'personal-calendar':
                this.presentPersonalOptionSheet();
                break;
            case 'personal-month-year':
                this.presentPersonalOptionSheet();
                break;
            case 'personal-week-month-year':
                this.presentPersonalOptionSheet();
                break;
        }
    }

    backClick(): void {
        switch (this.pageName) {
            case 'general-calendar':
                this._router.navigate(['main/person-summary']);
                break;
            case 'general-month-year':
                this._router.navigate(['main/general-calendar']);
                break;
            case 'general-week-month-year':
                this._router.navigate(['main/general-calendar']);
                break;
            case 'personal-calendar':
                this._router.navigate(['main/person-summary']);
                break;
            case 'personal-month-year':
                this._router.navigate(['main/personal-calendar']);
                break;
            case 'personal-week-month-year':
                this._router.navigate(['main/personal-calendar']);
                break;
            case 'statistics':
                this._router.navigate(['main/person-summary']);
                break;
            case 'statistics-department':
                this._router.navigate(['main/statistics']);
                break;
            case 'create-reminder':
                this._router.navigate(['main/general-calendar']);
                break;
            case 'create-task':
                this._router.navigate(['main/general-calendar']);
                break;
            case 'create-new-date':
                this._router.navigate(['main/general-calendar']);
                break;
            case 'edit-reminder':
                this._router.navigate(['main/general-calendar']);
                break;
            case 'edit-task':
                this._router.navigate(['main/general-calendar']);
                break;
            case 'department':
                this._router.navigate(['main/person-summary']);
                break;
            case 'employee':
                this._router.navigate(['main/person-summary']);
                break;
            case 'statistics-employee':
                this._router.navigate(['main/person-summary']);
                break;
            case 'chat-message':
                this._router.navigate(['main/person-summary']);
                break;
            case 'chat-message-employee':
                this._router.navigate(['main/chat-message']);
                break;
        }
    }

    resetToolBarInfo(params: any): void {
        this.isBackBtn = false;
        this.isPlusBtn = false;
        this.isSettingBtn = false;
        this.pageTitle = '';
        switch (this.pageName) {
            case 'person-summary':
                this.isSettingBtn = true;
                break;
            case 'general-calendar':
                this.pageTitle = 'GENERAL CALENDAR';
                this.isBackBtn = true;
                this.isPlusBtn = true;
                break;
            case 'general-month-year':
                let dateMoment = moment(params.date);
                this.pageTitle = dateMoment.format('MMMM').toUpperCase() + ' ' + dateMoment.format('YYYY');
                this.isBackBtn = true;
                this.isPlusBtn = true;
                break;
            case 'general-week-month-year':
                dateMoment = moment(params.date);
                this.pageTitle = 'WEEK ' + this.getWeekNumber(dateMoment.toDate()) + ' '
                    + dateMoment.format('MMMM').toUpperCase() + ' ' + dateMoment.format('YYYY');
                this.isBackBtn = true;
                this.isPlusBtn = true;
                break;
            case 'personal-calendar':
                this.pageTitle = 'PERSONAL CALENDAR';
                this.isBackBtn = true;
                this.isPlusBtn = true;
                break;
            case 'personal-month-year':
                dateMoment = moment(params.date);
                this.pageTitle = dateMoment.format('MMMM').toUpperCase() + ' ' + dateMoment.format('YYYY');
                this.isBackBtn = true;
                this.isPlusBtn = true;
                break;
            case 'personal-week-month-year':
                dateMoment = moment(params.date);
                this.pageTitle = 'WEEK ' + this.getWeekNumber(dateMoment.toDate()) + ' '
                    + dateMoment.format('MMMM').toUpperCase() + ' ' + dateMoment.format('YYYY');
                this.isBackBtn = true;
                this.isPlusBtn = true;
                break;
            case 'statistics':
                this.pageTitle = 'STATISTICS';
                this.isBackBtn = true;
                break;
            case 'statistics-department':
                this.pageTitle = 'STATISTICS ' + params.deptName.toUpperCase();
                this.isBackBtn = true;
                break;
            case 'create-reminder':
                this.pageTitle = 'NEW REMINDER';
                this.isBackBtn = true;
                break;
            case 'create-task':
                this.pageTitle = 'NEW TASK';
                this.isBackBtn = true;
                break;
            case 'edit-reminder':
                this.pageTitle = 'EDIT REMINDER';
                this.isBackBtn = true;
                break;
            case 'edit-task':
                this.pageTitle = 'EDIT TASK';
                this.isBackBtn = true;
                break;
            case 'create-new-date':
                this.pageTitle = 'NEW DATE';
                this.isBackBtn = true;
                break;
            case 'department':
                this.pageTitle = params.deptName.toUpperCase();
                this.isPlusBtn = true;
                this.isBackBtn = true;
                break;
            case 'employee':
                this.pageTitle = params.empName.toUpperCase();
                this.isBackBtn = true;
                break;
            case 'statistics-employee':
                this.pageTitle = 'STATISTICS ' + params.empName.toUpperCase();
                this.isBackBtn = true;
                break;
            case 'chat-message':
                this.pageTitle = 'MESSAGES';
                this.isBackBtn = true;
                this.isSettingBtn = true;
                break;
            case 'chat-message-employee':
                this.pageTitle = params.empName.toUpperCase();
                this.isBackBtn = true;
                break;
        }
    }

    async presentGeneralOptionSheet() {
        const actionSheet = await this.sheetCtrl.create({
            id: 'general-option-sheet',
            buttons: [{
                text: 'Reminder',
                handler: () => {
                    this._router.navigateByUrl('main/create-reminder');
                }
            }, {
                text: 'Task',
                handler: () => {
                    this._router.navigateByUrl('main/create-task');
                }
            }, {
                text: 'New Date',
                handler: () => {
                    this._router.navigateByUrl('main/create-new-date');
                }
            }]
        });

        await actionSheet.present();
    }

    async presentPersonalOptionSheet() {
        const actionSheet = await this.sheetCtrl.create({
            id: 'personal-option-sheet',
            buttons: [{
                text: 'Reminder',
                handler: () => {
                    this._router.navigateByUrl('main/create-reminder');
                }
            }, {
                text: 'Task',
                handler: () => {
                    this._router.navigateByUrl('main/create-task');
                }
            }, {
                text: 'New Date',
                handler: () => {
                    this._router.navigateByUrl('main/create-new-date');
                }
            }]
        });

        await actionSheet.present();
    }

    getWeekNumber(d: Date): number {
        const target = new Date(d);

        const weekstart = 1;

        const dayNr = (d.getDay() + 7 - weekstart) % 7;
        target.setDate(target.getDate() - dayNr + 3);

        const firstThursday = target.valueOf();

        target.setMonth(d.getMonth(), 1);
        if (target.getDay() !== 4) {
            target.setMonth(d.getMonth(), 1 + ((4 - target.getDay()) + 7) % 7);
        }

        return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
    }
}
