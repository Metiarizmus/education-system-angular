import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SignupRequestUser} from "../../payload/request/signup-request.user";
import {map, Observable, tap} from "rxjs";
import {LoginRequestUser} from "../../payload/request/login-request.user";
import {LoginResponse} from "../../payload/response/login.response";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = environment.apiBaseUrlAuth;

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService,
              private router: Router,
              public jwtHelper: JwtHelperService) {
  }


  signup(signupRequestUser: SignupRequestUser, selectedFile: any): Observable<any> {

    const payload = new FormData();
    payload.append("user", JSON.stringify(signupRequestUser));
    payload.append("avatar", selectedFile, selectedFile.name);

    return this.httpClient.post(`${this.apiServerUrl}/signup`, payload, {responseType: 'text'})
  }

  login(loginRequestUser: LoginRequestUser): Observable<any> {
    return this.httpClient.post<LoginResponse>(`${this.apiServerUrl}/signin`, loginRequestUser)
      .pipe(map(data => {
        console.log(data)
        this.localStorage.store('accessToken', data.token)
        this.localStorage.store('refreshToken', data.refreshToken)
        this.localStorage.store('expiresAt', data.expiresAt)
        this.localStorage.store('email', data.email)
        this.localStorage.store('roles', data.roles)
        return true;
      }))
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  isAuthenticated(): boolean {
    let token = this.localStorage.retrieve('accessToken');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
