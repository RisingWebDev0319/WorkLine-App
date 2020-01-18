import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

export class ChatMessage {
    key: string;
    userId: string;
    userName: string;
    userAvatar: string;
    toUserId: string;
    time: number | string;
    message: string;
    status: string;
}

export class UserInfo {
    id: string;
    name?: string;
    avatar?: string;
}

@Injectable()
export class ChatService {
    private roomID: any;

    constructor(private http: HttpClient, private userService: UserService,
        private events: Events) {
    }

    async registerRoom(roomID: any) {
        this.roomID = roomID;
        firebase.database().ref('chatrooms/' + roomID + '/chats').on('value', resp => {
            let list = [];
            list = this.snapshotToArray(resp);

            this.events.publish('chat:received', list, Date.now());
        });
    }

    snapshotToArray(snapshot: any) {
        let returnArr = [];

        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();

            const newMsg: ChatMessage = {
                key: childSnapshot.key,
                userId: item.userId,
                userName: item.userName,
                userAvatar: item.userAvatar,
                toUserId: item.toUserId,
                time: item.time,
                message: item.message,
                status: item.status
            };

            returnArr.push(newMsg);
        });

        return returnArr;
    };

    async sendMsg(msg: ChatMessage) {
        let newData = firebase.database().ref('chatrooms/' + this.roomID + '/chats').push();

        newData.set({
            userId: msg.userId,
            userName: msg.userName,
            userAvatar: msg.userAvatar,
            toUserId: msg.toUserId,
            time: msg.time,
            message: msg.message,
            status: 'success'
        });
    }
}