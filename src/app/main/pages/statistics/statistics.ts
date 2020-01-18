import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
    selector: 'statistics',
    templateUrl: 'statistics.html',
    styleUrls: ['statistics.scss'],
})

export class StatisticsPage implements OnInit {
    container: any = {
        width: 0,
        height: 0
    };

    deptList: any = [
    ];

    general: any = {
        percent: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    };

    dateData: {
        time: string,
        date: string
    };

    constructor(private _router: Router, private userService: UserService) {
        let general_target = 0;
        let general_value = 0;
        this.userService.getUser().departments.map((department: any) => {
            this.deptList.push({
                id: department._id,
                title: department.name,
                radius: 0,
                x: 0,
                y: 0,
                percent: Math.floor(department.production.value / (department.production.target ? department.production.target : 1 )* 100)
            });
            general_target += department.production.target;
            general_value += department.production.value;
        });

        this.general.percent = Math.floor(general_value / general_target * 100);

        this.dateData = {
            time: '',
            date: ''
        };

        this.dateData.time = moment(Date.now()).format('HH : mm');
        this.dateData.date = moment(Date.now()).format('MMM , DD');
    }



    ngOnInit() {
        this.container.width = $(window).width();

        const originX = this.container.width / 2;
        const distance = originX - originX / 3;
        this.container.height = this.container.width;
        const originY = this.container.height / 2;

        const angleStep = 2 * Math.PI / this.deptList.length;
        this.deptList.forEach((dept: any, index: any) => {
            dept.radius = distance / 2 - distance / 10;
            dept.x = Math.floor(originX + Math.sin(angleStep * index) * distance) - dept.radius;
            dept.y = Math.floor(originY - Math.cos(angleStep * index) * distance) - dept.radius;
        });

        this.general.width = distance;
        this.general.height = this.general.width;
        this.general.x = originX - this.general.width / 2;
        this.general.y = originY - this.general.height / 2;
    }

    showStatistics(dept) {
        this._router.navigate(['main/statistics-department', { deptID: dept.id, deptName: dept.title }]);
    }
}