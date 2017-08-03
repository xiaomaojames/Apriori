import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-index',
  templateUrl: 'data-menu.component.html',
  styleUrls: ['data-menu.component.scss']
})
export class DataMenuComponent implements OnInit {
  dataList= [];

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.http.get('http://localhost:3000').subscribe((data) => {
      this.dataList = data.json();
    });

  }
}
