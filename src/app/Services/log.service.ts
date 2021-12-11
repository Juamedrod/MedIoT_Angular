import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl: string;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.baseUrl = environment.baseURL + '/api/';
  }

  public getLogs(): Promise<string> {
    return this.httpClient.get<string>(this.baseUrl + 'logs', this.authService.getAuthHeaders()).toPromise();
  }

  public downloadCSV(dId: string, limit: string, variable?: string) {
    return this.httpClient.get<any>(this.baseUrl + 'exports/' + dId + '/' + variable + '?limit=' + limit, this.authService.getAuthHeaders()).toPromise();
  }
}
