import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Interfaces/user.interface';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

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
    this.baseUrl = environment.baseURL + '/api/users';
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
 * Retrieve Active User decrypted in token(NO API CALL)
 * @returns  {User} User active in short format
 */
  getUser() {
    return this.user;
  }

  /**
 * Retrieve Active User detailed (API CALL)
 * @returns  {User} User active in full format
 */
  getUserAPI(): Promise<User> {
    return this.httpClient.get<User>(this.baseUrl, this.getAuthHeaders()).toPromise();
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

  /**
 * Update user info
 * @param {User} user Updated user
 * @returns  {Promise<User>} Promise with the user updated
 */
  update(user: User): Promise<User> {
    return this.httpClient.put<User>(this.baseUrl, user, this.getAuthHeaders()).toPromise();
  }

  /**
* Remove user from the database
* @param {User} user User to be removed
* @returns  {Object} Object
*/
  remove(user: User): Promise<Object> {
    return this.httpClient.delete(this.baseUrl, this.getAuthHeaders()).toPromise();
  }

}
