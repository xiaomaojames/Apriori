import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DataMenuComponent} from './data-menu.component';
import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";

@NgModule({
  imports: [
    RouterModule.forRoot([{
      path: 'anlize/:fileName',
      component: AppComponent
    },
      {
        path: 'login',
        component: LoginComponent
      }, {
        path: '',
        component: DataMenuComponent
      }
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouting {

}
