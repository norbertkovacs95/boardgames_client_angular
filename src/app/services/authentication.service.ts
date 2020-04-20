import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from 'src/app/shared/user';
import { TokenService } from './token.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    public jwtHelper: JwtHelperService) { }

  signupUser(user: User): Observable<any> {
    return this.http.post<any>(baseURL + 'users/signup',user);
  }

  loginUser(user: User): Observable<any>  {
    return this.http.post<any>(baseURL + 'users/login',user);
  }

  isAuthenticated() : boolean {
    let token = <string>this.tokenService.getJWT();
    return !this.jwtHelper.isTokenExpired(token);
  }

  isUserVerified(): Observable<any> {
    let token = this.tokenService.getJWT();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<any>(baseURL + 'users/verifyUser', {}, httpOptions)
  }
}
