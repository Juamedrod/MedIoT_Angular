import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Interfaces/user.interface';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authCredentials: string;
  private user: User;
  baseUrl: string;
  jwt: JwtHelperService;

  constructor(private httpClient: HttpClient) {
    this.jwt = new JwtHelperService(),
      this.baseUrl = 'http://192.168.1.39:3000/api/users';
    this.authCredentials = '';
    this.user = {
      name: ''
    }

  }

  /**
  * Retrieve auth token if avaliable, and decode public info
  * being avaliable to all injections of this service
  * @returns  undefined|token
  */
  getToken() {
    if (this.authCredentials === '') {
      if (localStorage.getItem('authCredentials')) {
        this.authCredentials = localStorage.getItem('authCredentials')!;
        this.user = this.jwt.decodeToken(this.authCredentials);
        console.log(this.user);///DELETE DELTE
        return this.authCredentials;
      }
      return undefined;
    } else {
      return this.authCredentials;
    }
  }

  getUser() {
    return this.user;
  }

  setToken(token: string) {
    this.authCredentials = token;
    this.user = this.jwt.decodeToken(this.authCredentials);
  }

  register(user: User) {
    return this.httpClient.post<any>(this.baseUrl + '/register', user).toPromise();
  }

  login(credentials: any) {
    return this.httpClient.post<any>(this.baseUrl + '/login', credentials).toPromise();
  }
}
