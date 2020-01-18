import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Config } from '../config/config';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class ReminderService {
    constructor(private http: Http, private userService: UserService) { }

    topReminders(data): Promise<any> {
        const self = this;
        const headers = new Headers();

        headers.append('Authorization', 'Bearer ' + this.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'reminder/top-reminders', data, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    addReminder(reminder: any): Promise<any> {
        const self = this;
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + self.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'reminder/register', reminder, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    updateReminder(reminder: any): Promise<any> {
        const self = this;
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + self.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'reminder/update', reminder, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    getReminder(data): Promise<any> {
        const self = this;
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + self.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'reminder/get', data, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }
}
