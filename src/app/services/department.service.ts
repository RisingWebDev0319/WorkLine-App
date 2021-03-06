import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Config } from '../config/config';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class DepartmentService {
    constructor(private http: Http, private userService: UserService) { }

    getEmployeesForDept(data): Promise<any> {
        const self = this;
        const headers = new Headers();

        headers.append('Authorization', 'Bearer ' + this.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'department/employees', data, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    getDeptInfo(data: any): Promise<any> {
        const self = this;
        const headers = new Headers();

        headers.append('Authorization', 'Bearer ' + this.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'department/info', data, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    addDept(department: any): Promise<any> {
        const self = this;
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + self.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'department/register', department, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    getStatisticsInfoByID(data: any): Promise<any> {
        const self = this;

        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + self.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'department/statistics', data, opt).pipe(map(resp => resp.json())).subscribe(
                o => {
                    resolve(o);
                },
                err => {
                    reject(err.json());
                }
            );
        });
    }

    updateInfo(data: any): Promise<any> {
        const self = this;

        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + self.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'department/update-pro-billing', data, opt).pipe(map(resp => resp.json())).subscribe(
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
