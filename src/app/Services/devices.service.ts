import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../Interfaces/device.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  devices: Device[];
  baseURL: string;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.baseURL = "http://192.168.1.39:3000/api/devices";
    this.devices = [];
  }

  /**
   * Get All devices for this user from the API.
   */
  getAll(): Promise<Device[]> {
    return this.httpClient.get<Device[]>(this.baseURL, this.authService.getAuthHeaders()).toPromise();
  }

  create(device: Device): Promise<Device> {
    return this.httpClient.post<Device>(this.baseURL, device, this.authService.getAuthHeaders()).toPromise();
  }

  checkId(dId: string) {
    return this.httpClient.post<any>(this.baseURL + '/checkid', { dId }, this.authService.getAuthHeaders()).toPromise();
  }

  edit(device: Device): Promise<Device> {
    return this.httpClient.put<Device>(this.baseURL, device, this.authService.getAuthHeaders()).toPromise();
  }

  remove(did: string): any {
    return this.httpClient.delete<any>(this.baseURL + '/' + did, this.authService.getAuthHeaders()).toPromise();
  }
}
