import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DisplayConfig } from '../Interfaces/DisplayConfig.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlackboardService {
  arrConfig: DisplayConfig[];
  baseURL: string;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.arrConfig = [];
    this.baseURL = "http://192.168.1.39:3000/api/blackboard";
  }

  updateArrConfig(arrConfig: DisplayConfig[]) {
    return this.httpClient.put<any>(this.baseURL, arrConfig, this.authService.getAuthHeaders()).toPromise();
    //This function have to save this config array in the database
  }

  storeArrConfig(arrConfig: DisplayConfig[]) {
    return this.httpClient.post<any>(this.baseURL, arrConfig, this.authService.getAuthHeaders()).toPromise();
    //This function have to save this config array in the database
  }

  getArrConfig(): Promise<any> {
    return this.httpClient.get<any>(this.baseURL, this.authService.getAuthHeaders()).toPromise();
  }
}


