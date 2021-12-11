import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
    this.baseURL = environment.baseURL + '/api/blackboard';
  }

  /**
   * Function to update changes on actual DisplayConfigs already present in the blackboard
   * @param arrConfig Array with the changes made to the ArrConfig
   * @returns Updated DisplayConfig
   */
  updateArrConfig(arrConfig: DisplayConfig[]) {
    return this.httpClient.put<any>(this.baseURL, arrConfig, this.authService.getAuthHeaders()).toPromise();
  }

  /**
    * Function to save a new ArrConfig on db.
    * @param arrConfig ArrConfig to save on db
    * @returns created arrConfig
    */
  storeArrConfig(arrConfig: DisplayConfig[]) {
    return this.httpClient.post<any>(this.baseURL, arrConfig, this.authService.getAuthHeaders()).toPromise();
  }

  /**
   * Function to recover the arrConfig present on db for display.
   * @returns the arrConfig present on db for this user
   */
  getArrConfig(): Promise<any> {
    return this.httpClient.get<any>(this.baseURL, this.authService.getAuthHeaders()).toPromise();
  }
}


