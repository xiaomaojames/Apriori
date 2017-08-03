import {Component, OnInit} from '@angular/core';

import {DrawBalls} from './drawBalls.service';
import * as _ from 'lodash';
import 'rxjs/add/operator/switchMap';

declare var $: any;
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {AprioriService} from './apriori.service';
import {httpFactory} from '@angular/http/src/http_module';
import {inject} from '@angular/core/testing';
import {ActivatedRoute, Params, Route} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  static drv;
  initData;
  ap;
  oneFre = [];
  twoFre = [];

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
    const winHeight = $('.first-win41').height() - 24;
    console.log(winHeight);
    $('#second-can').css('width', winWidth);
    $('#second-can').css('height', winHeight);

  }

  // 请求数据
  getData(id) {
    this.http.get('http://localhost:3000/' + id).subscribe((data: Response) => {
      const initData = [];
      for (let i = 0; i < 1000; i++) {
        const arr = [];
        for (let k = 0; k < _.random(10, 20); k++) {
          arr.push(_.random(1, 15).toString());
        }
        initData.push(arr);
      }

      this.ap = new AprioriService(0.34, initData);
      this.oneFre = this.ap.oneFrequentSets;
      this.twoFre = this.ap.twoFrequentSets;
      this.initData = initData;
      AppComponent.drv = new DrawBalls(this.ap);
    });
  }

  ngOnInit() {
    this.route.params
      .switchMap((p: Params) =>
        this.http.get('http://localhost:3000/' + p['fileName'])
      ).subscribe((data: Response) => {
      const initData = [];

      this.ap = new AprioriService(0.34, initData);
      this.oneFre = this.ap.oneFrequentSets;
      this.twoFre = this.ap.twoFrequentSets;
      this.initData = initData;
      AppComponent.drv = new DrawBalls(this.ap);
    });

    this.initCanvasSize();
  }
}
