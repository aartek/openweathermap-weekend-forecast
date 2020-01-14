import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MomentModule} from 'ngx-moment';
import { ConfigModalComponent } from './components/config-modal/config-modal.component';
import {ButtonModule, ModalModule} from "@fundamental-ngx/core";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {AppLoaderService} from "./services/app-loader.service";



function init(svc: AppLoaderService) {
  return () => svc.init();
}

@NgModule({
  declarations: [
    AppComponent,
    ConfigModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule,
    ModalModule,
    ButtonModule,
    NoopAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient,
    AppLoaderService,
    { provide: APP_INITIALIZER, useFactory: init, deps: [AppLoaderService], multi: true },

  ],
  bootstrap: [AppComponent, ConfigModalComponent]
})
export class AppModule { }
