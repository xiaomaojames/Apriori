import {Component, OnInit} from '@angular/core';

import {DrawBalls} from './drawBalls.service';
import * as _ from 'lodash';
import 'rxjs/add/operator/switchMap';

declare var $: any;
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {AprioriService} from './apriori.service';
import {config} from '../environments/config';
import {ActivatedRoute, Params, Route} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  static drv;
  static ap;
  oneFre = [];
  twoFre = [];
  initData;
  myIndex = 0;
  winHeight = 0;
  runState = false;
  runOnce = false;

  static drawBall() {
    const ball = new Path2D();
    ball.arc(AppComponent.drv.balls[AppComponent.drv.ballIndex][0],
      AppComponent.drv.balls[AppComponent.drv.ballIndex][1], 20, 0, Math.PI * 2);
    AppComponent.drv.ctx.stroke(ball);
    AppComponent.drv.ballIndex++;
    if (AppComponent.drv.ballIndex < 199) {
      AppComponent.drv.drawBallRaf = window.requestAnimationFrame(AppComponent.drawBall);
    } else {
      window.cancelAnimationFrame(AppComponent.drv.drawBallRaf);
      AppComponent.drv.drawLineRaf = window.requestAnimationFrame(AppComponent.drawLines);
    }
  }

  static drawLines() {
    const line = new Path2D();
    line.moveTo(AppComponent.drv.lines[AppComponent.drv.lineIndex][0][0], AppComponent.drv.lines[AppComponent.drv.lineIndex][0][1]);
    line.lineTo(AppComponent.drv.lines[AppComponent.drv.lineIndex][1][0], AppComponent.drv.lines[AppComponent.drv.lineIndex][1][1]);
    AppComponent.drv.ctx.stroke(line);
    AppComponent.drv.lineIndex++;
    if (AppComponent.drv.lineIndex < 19) {
      window.requestAnimationFrame(AppComponent.drawLines);
    } else {
      window.cancelAnimationFrame(AppComponent.drv.drawLineRaf);
    }
  }

  constructor(private http: Http, private route: ActivatedRoute) {
  }

  // 初始化第二和第三个窗口的画布和窗口大小一样
  initCanvasSize() {
    // 获得窗口大小
    const winWidth = $('.first-win41').width() - 10;
    console.log(winWidth);
    this.winHeight = $('.first-win41').height() - 24;
    $('#second-can').css('width', winWidth);
    $('#second-can').css('height', this.winHeight);

  }

  ngOnInit() {
    this.route.params
      .switchMap((p: Params) =>
        this.http.get(config.apiAddress + p['fileName'])
      ).subscribe((data: Response) => {
      const initData = [];
      _.each(data.json(), (row) => {
        initData.push(row.text.split(' '));
      });
      this.initData = initData;
      const that = this;
      const si = setInterval(() => {
        console.log(that.myIndex);
        if (that.runOnce || that.runState) {
          ++that.myIndex;
          AppComponent.ap = new AprioriService(0.3, _.slice(initData, 0, that.myIndex));
          that.oneFre = AppComponent.ap.oneFrequentSets;
          that.twoFre = AppComponent.ap.twoFrequentSets;
          AppComponent.drv = new DrawBalls(AppComponent.ap);
          that.runOnce = false;
        }

        // 找到当前行元素 然后判断离当前窗口底部的距离，防止超出可视区域
        if ($('.first-win41 .data')[0].scrollTop + that.winHeight - 50 < 25 * that.myIndex) {
          $('.first-win41 .data')[0].scrollTop += that.winHeight - 50;
        }
        // 也不能超出顶部可视区域
        if ($('.first-win41 .data')[0].scrollTop > 25 * that.myIndex) {
          $('.first-win41 .data')[0].scrollTop -= that.winHeight - 50;
        }

        if (that.myIndex > initData.length) {
          that.runState = false;
          that.myIndex = 0;
          // window.clearInterval(si);
        }
      }, 1000);

    });

    this.initCanvasSize();
  }

  start() {
    this.runState = true;
  }

  stop() {
    this.runState = false;
  }

  go(no) {
    this.myIndex = no;
    this.runOnce = true;
    this.runState = false;
  }
}
