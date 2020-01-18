import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Config } from '../config/config';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class DateService {
    constructor(private http: Http, private userService: UserService) { }

    addDate(date: any): Promise<any> {
        const self = this;
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + self.userService.getToken());
        const opt = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            self.http.post(Config.api_url + 'date/register', date, opt).pipe(map(resp => resp.json())).subscribe(
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
