import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorInterceptor } from '../app/_helpers/error.interceptor';
import { HomepageComponent } from './pages/homepage/homepage.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '../../node_modules/@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './_guards/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';
import {HttpErrorHandler} from './_services/http-error-handler.service';
import {MessageService} from './_services/message.service';
import { FooterComponent } from './pages/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomepageComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    routing
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
    HttpErrorHandler,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
