import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'chat-message',
    templateUrl: 'chat-message.html',
    styleUrls: ['chat-message.scss'],
})
export class ChatMessagePage {
    userList: any[];
    searchKey: string;
    selectedUserList: any[];

    constructor(private _router: Router, private utilService: UtilService, private userService: UserService) {
        this.userList = [];
        this.searchKey = '';
        this.getAllEmployees();
    }

    async getAllEmployees() {
        await this.utilService.showLoading();
        const self = this;
        this.userService.getAllEmployees().then(async function (o) {
            await self.utilService.closeLoading();
            if (o.success) {
                self.userList = o.users;
                self.searchUser();
            } else {
                self.utilService.showErrorToast(o.message);
            }
        }, (error) => {
            self.utilService.closeLoading();
            self.utilService.showErrorToast(error.message);
        });
    }

    showChatMessageEmployee(user) {
        this._router.navigate(['main/chat-message-employee', { empID: user.id, empName: user.name }]);
    }

    searchUser() {
        const self = this;
        this.selectedUserList = this.userList.filter((user) => {
            if (user.name.indexOf(self.searchKey) >= 0) {
                return user;
            }
        });
    }
}
