import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
    selector: 'main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss'],
})

export class MainComponent {
    constructor(private _router: Router, private sheetCtrl: ActionSheetController, private userService: UserService) {
    }

    async presentCalendarOptionSheet() {
        const actionSheet = await this.sheetCtrl.create({
            id: 'calendar-option-sheet',
            buttons: [{
                text: 'Personal',
                handler: () => {
                    this._router.navigateByUrl('main/personal-calendar');
                }
            }, {
                text: 'General',
                handler: () => {
                    this._router.navigateByUrl('main/general-calendar');
                }
            }]
        });

        await actionSheet.present();
    }

    async presentDeptOptionSheet() {
        const depOptions = [];

        this.userService.getUser().departments.map((department) => {
            depOptions.push({
                text: department.name,
                handler: () => {
                    this._router.navigate(['main/department', { deptID: department._id, deptName: department.name }]);
                }
            });
        });

        const actionSheet = await this.sheetCtrl.create({
            id: 'dept-option-sheet',
            buttons: depOptions
        });

        await actionSheet.present();
    }

    showPersonSummary() {
        this._router.navigateByUrl('main/person-summary');
    }

    showStatistics() {
        this._router.navigateByUrl('main/statistics');
    }

    showChatMessage() {
        this._router.navigateByUrl('main/chat-message');
    }
}
