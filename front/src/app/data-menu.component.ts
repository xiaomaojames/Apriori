import {Component, Input, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {config} from '../environments/config';
import {BsModalService} from "ngx-bootstrap";
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {LoginComponent} from "./login/login.component";

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: 'data-menu.component.html',
  styleUrls: ['data-menu.component.scss']
})
export class DataMenuComponent implements OnInit {
  dataList = [];
  myFile;
  bsModalRef: BsModalRef;

  constructor(private http: Http, private modalService: BsModalService) {
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

  showLogin() {
    this.bsModalRef = this.modalService.show(LoginComponent);
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
