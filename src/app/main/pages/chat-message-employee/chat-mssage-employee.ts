import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ChatService, ChatMessage, UserInfo } from '../../../services/chat.service';
import { Events, IonContent, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'chat-message-employee',
    templateUrl: 'chat-message-employee.html',
    styleUrls: ['chat-message-employee.scss'],
})
export class ChatMessageEmployeePage implements OnDestroy {
    @ViewChild(IonContent) content: IonContent;
    @ViewChild('chat_input') messageInput: ElementRef;
    msgList: ChatMessage[] = [];
    user: UserInfo;
    toUser: UserInfo;
    editorMsg = '';

    constructor(
        private _router: Router, private _route: ActivatedRoute, private chatService: ChatService,
        private userService: UserService, private events: Events, private utilService: UtilService) {
        this.toUser = {
            id: this._route.snapshot.params['empID'],
            name: this._route.snapshot.params['empName'],
            avatar: !this._route.snapshot.params['empAvatar'] ? '../../assets/imgs/main/user.jpg'
                : this._route.snapshot.params['empAvatar']
        };

        const u = this.userService.getUser();

        this.user = {
            id: u._id,
            name: u.name,
            avatar: !u.avatar ? '../../assets/imgs/main/user.jpg' : u.avatar
        };

        if (this.user.id < this.toUser.id) {
            this.chatService.registerRoom(this.user.id + '-' + this.toUser.id);
        } else {
            this.chatService.registerRoom(this.toUser.id + '-' + this.user.id);
        }

        this.events.subscribe('chat:received', msgList => {
            this.msgList = msgList;

            this.utilService.closeLoading();
            this.scrollToBottom();
            this.focus();
        });

        this.utilService.showLoading();
    }

    ngOnDestroy() {
        this.events.unsubscribe('chat:received');
    }


    onFocus() {
        this.scrollToBottom();
    }

    sendMsg() {
        if (!this.editorMsg.trim()) {
            return;
        }

        const id = Date.now().toString();

        const newMsg: ChatMessage = {
            key: '',
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: this.editorMsg,
            status: 'pending'
        };

        this.pushNewMsg(newMsg);
        this.editorMsg = '';

        this.focus();

        this.chatService.sendMsg(newMsg);
    }

    pushNewMsg(msg: ChatMessage) {
        const userId = this.user.id,
            toUserId = this.toUser.id;
        if (msg.userId === userId && msg.toUserId === toUserId) {
            this.msgList.push(msg);
        } else if (msg.toUserId === userId && msg.userId === toUserId) {
            this.msgList.push(msg);
        }
        this.scrollToBottom();
    }

    getMsgIndexById(id: string) {
        return this.msgList.findIndex(e => e.key === id)
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 400);
    }

    private focus() {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    }
}
