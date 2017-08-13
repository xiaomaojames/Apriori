import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {AppRouting} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataMenuComponent} from './data-menu.component';
import {RouterModule} from '@angular/router';
import {AppBootComponent} from './app-boot.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DataMenuComponent,
    AppBootComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRouting,
    RouterModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppBootComponent]
})
export class AppModule {
}
