import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { BackendService } from './_services';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundPageComponent } from './notfoundpage/notfoundpage.component';
import { LoadingComponent } from  './loading/loading.component';
import { AuthGuard } from './_guard';
import { AppComponent } from './app.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent,
    NotFoundPageComponent,
    LoadingComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [
    AuthGuard,
    BackendService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
