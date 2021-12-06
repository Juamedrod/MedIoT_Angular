import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    this.jwt = new JwtHelperService();
    this.baseUrl = 'http://192.168.1.39:3000/api/users';
    this.authCredentials = '';
    this.user = {
      name: ''
    }
  }

  /**
  * Retrieve auth token if avaliable, and decode public info
  * being avaliable to all injections of this service.
  * @returns  undefined|token.
  */
  getToken() {
    if (localStorage.getItem('authCredentials')) {
      this.authCredentials = localStorage.getItem('authCredentials')!;
      this.user = this.jwt.decodeToken(this.authCredentials);
      return this.authCredentials;
    }
    this.setToken('');
    return '';
  }

  /**
   *  Utility method to easily set the Auth header with the token.
   * @returns {object} httpOptions=> An object with the set-Up of auth headers.
   */
  getAuthHeaders(): Object {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth': this.getToken()
      })
    }
    return httpOptions;
  }

  /**Retrieve a boolean with the verification of the token.        
   * @returns {boolean} Return true if token passed verification, false elsewhere.
   * {auth: boolean, error: error} output object
   */
  verifySignature() {
    try {
      return this.httpClient.get(this.baseUrl + '/checkin', this.getAuthHeaders()).toPromise();
    } catch (error) {
      return { auth: false, error: error };
    }
  }

  /**
 * Manually set the auth token passed by parameter
 * @param {String} token Stringified version of the JWT
 * @returns  {void}
 */
  setToken(token: string) {
    this.authCredentials = token;
    this.user = this.jwt.decodeToken(this.authCredentials);
  }

  /**
 * Retrieve Active User
 * @returns  {User} User active
 */
  getUser() {
    return this.user;
  }

  /**
  * Manually set the auth token passed by parameter and serve token.
  * @param {User} user User to be resgistered in the DB
  * @returns  {void}
  */
  register(user: User) {
    return this.httpClient.post<any>(this.baseUrl + '/register', user).toPromise();
  }

  /**
  * Log the user into the app and serve token.
  * @param {any} credentials Object with the Auth credentials
  * @returns  {void}
  */
  login(credentials: any) {
    return this.httpClient.post<any>(this.baseUrl + '/login', credentials).toPromise();
  }
}
