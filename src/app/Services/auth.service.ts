import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string;
  private authCredentials: string;
  private user: User;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://192.168.1.39:3000/api/users';
    this.authCredentials = '';
    this.user = {
      name: ''
    }
    this.getToken();
  }

  getToken() {
    if (this.authCredentials === '') {
      if (!localStorage.getItem('authCredentials')) {
        this.authCredentials = localStorage.getItem('authCredentials')!;
        return this.authCredentials;
      }
      return undefined;
    } else {
      return this.authCredentials;
    }
  }

  setToken(token: string) {
    this.authCredentials = token;
  }

  register(user: User) {
    return this.httpClient.post<any>(this.baseUrl + '/register', user).toPromise();
  }

  login(credentials: any) {
    return this.httpClient.post<any>(this.baseUrl + '/login', credentials).toPromise();
  }
}
