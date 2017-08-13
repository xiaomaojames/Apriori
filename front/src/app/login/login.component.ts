import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {isUndefined} from "util";
import {BsModalRef} from "ngx-bootstrap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName = 'kbdex';
  password = 'kbdex';

  close() {
    this.bsModalRef.hide();
  }

  submit() {
    // console.log(this.password, this.userName);
    // if (this.password !== '' && this.password !== undefined && this.userName === this.password) {
    //   this.router.navigateByUrl('/dataMenu');
    // } else {
    //   alert('the userName or password is not correct');
    // }
    alert('not implemented');
  }

  constructor(private router: Router, public bsModalRef: BsModalRef) {
  }

  ngOnInit() {

  }

}
