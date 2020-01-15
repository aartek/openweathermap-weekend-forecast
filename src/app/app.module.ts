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
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    ConfigModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule,
    RouterModule.forRoot([{ path: '#', component: AppComponent }],
      { useHash: true }),
    ModalModule,
    ButtonModule,
    NoopAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient,
    AppLoaderService,
    { provide: APP_INITIALIZER, useFactory: (svc: AppLoaderService) => () => svc.init, deps: [AppLoaderService], multi: true },

  ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent, ConfigModalComponent]
})
export class AppModule { }
