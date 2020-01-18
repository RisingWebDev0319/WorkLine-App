import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Config } from '../config/config';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class TimeService {
    constructor(private http: Http, private userService: UserService) { }

    getMonthDataForGeneral(data): Promise<any> {
        const self = this;
        const headers = new Headers();

        headers.append('Authorization', 'Bearer ' + this.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'time/month-general', data, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    getWeekDataForGeneral(data): Promise<any> {
        const self = this;
        const headers = new Headers();

        headers.append('Authorization', 'Bearer ' + this.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'time/week-general', data, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    getWeekTimeDataForGeneral(data): Promise<any> {
        const self = this;
        const headers = new Headers();

        headers.append('Authorization', 'Bearer ' + this.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'time/week-time-general', data, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    getMonthDataForPersonal(data): Promise<any> {
        const self = this;
        const headers = new Headers();

        headers.append('Authorization', 'Bearer ' + this.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'time/month-personal', data, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    getWeekDataForPersonal(data: any): Promise<any> {
        const self = this;
        const headers = new Headers();

        headers.append('Authorization', 'Bearer ' + this.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'time/week-personal', data, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    getWeekTimeDataForPersonal(data: any): Promise<any> {
        const self = this;
        const headers = new Headers();

        headers.append('Authorization', 'Bearer ' + this.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'time/week-time-personal', data, opt).pipe(map(resp => resp.json())).subscribe(
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
