import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl: string;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.baseUrl = 'http://192.168.1.39:3000/api/';
  }

  public getLogs(): Promise<string> {
    return this.httpClient.get<string>(this.baseUrl + 'logs', this.authService.getAuthHeaders()).toPromise();
  }

  public downloadCSV(dId: string, variable?: string) {
    return this.httpClient.get<any>(this.baseUrl + 'exports/' + dId + '/' + variable, this.authService.getAuthHeaders()).toPromise();
  }
}
