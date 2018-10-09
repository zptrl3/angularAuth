import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { globVars } from '../shared/global.variable';
import { User } from '../shared/_models/user.model';
import { SignUpData } from '../shared/_models/signup.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  address = 'http://' + globVars.host + ':' + globVars.port;
  _isLoggedIn = false;

  constructor(
    private http: HttpClient,
  ) {}

  login(body: User): Observable<HttpResponse<User>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(this.address + '/login', JSON.stringify(body), {headers, observe: 'response'}).pipe(
      );
  }

  signup(body: SignUpData): Observable<HttpResponse<SignUpData>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<SignUpData>(this.address + '/users/signup', body, {headers, observe: 'response'});
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      this._isLoggedIn = true;
      return this._isLoggedIn;
    }
    return this._isLoggedIn;
  }

  logout() {
    this._isLoggedIn = false;
    localStorage.removeItem('currentUser');
  }

}
