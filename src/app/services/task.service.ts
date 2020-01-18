import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Config } from '../config/config';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class TaskService {
    constructor(private http: Http, private userService: UserService) { }

    addTask(department: any): Promise<any> {
        const self = this;
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + self.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'task/register', department, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    getStatusLabel(status: any) {
        switch (status) {
            case 0:
                return 'Active';
                break;
            case 1:
                return 'Cancelled';
                break;
            case 2:
                return 'Paused';
                break;
            case 3:
                return 'Ended';
                break;
        }
    }

    updateTask(task: any): Promise<any> {
        const self = this;
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + self.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'task/update', task, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    getTask(data): Promise<any> {
        const self = this;
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + self.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'task/get', data, opt).pipe(map(resp => resp.json())).subscribe(
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
