import {Component, Input, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {config} from '../environments/config';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: 'data-menu.component.html',
  styleUrls: ['data-menu.component.scss']
})
export class DataMenuComponent implements OnInit {
  dataList = [];
  myFile;

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.http.get(config.apiAddress).subscribe((data) => {
      this.dataList = data.json();
    });

  }

  delete(fileName) {
    console.log(config.apiAddress);
    this.http.get(config.apiAddress + 'delete/' + fileName).subscribe(() => {
      this.ngOnInit();
    });
  }

  uploadFile(p) {
    const formData = new FormData();
    formData.append('file', p);
    $.ajax({
      url: config.apiAddress + 'upload',
      type: 'post',
      processData: false,
      contentType: false,
      data: formData,
      success: (data) => {
        this.ngOnInit();
      }
    });
  }
}
