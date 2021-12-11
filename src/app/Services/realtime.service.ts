import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Data } from '../Interfaces/data.interface';
import { Device } from '../Interfaces/device.interface';
import { AuthService } from './auth.service';
import { DevicesService } from './devices.service';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  baseURL: string;
  latestData: Data[];
  devices: Device[];
  /**Variable used to limit the user refresh rate over the database */
  dBCentinelSaverInterval: number;

  constructor(private httpClient: HttpClient, private authService: AuthService, private devicesService: DevicesService) {
    this.baseURL = environment.baseURL + '/api/data/';
    this.latestData = [];
    this.devices = [];
    this.dBCentinelSaverInterval = 1000;
  }
  /**
   *  Function to have a record of the user's devices.
   */
  async getDevices() {
    this.devices = await this.devicesService.getAll()
  }

  /**
   * Function to recover all data snapshots for every device
   * using an async map as driver.
   * @returns {void} The data recovered is stored in a class property of the service to 
   * be accesible faster.
   */
  async dataSnapshot() {
    this.latestData = await Promise.all(this.devices.map(async device => {
      return await this.getLatestSnapshot(device.dId);
    }));
  }

  /**
   * API call to get the latest values for this device.
   * @param dId Device Id
   * @returns Promise with the server/API response
   */
  getLatestSnapshot(dId: string) {
    return this.httpClient.get<Data>(this.baseURL + dId, this.authService.getAuthHeaders()).toPromise();
  };

  /**
   * Function to recover the value of a variable in a given device.
   * @param dId Device ID.
   * @param variable Variable ID. This show wich var of this device you try to access.
   * @returns {number| string} Return the value of variable or an error string otherwise.
   */
  getVariable(dId: string, variable: string) {
    try {
      const data = this.latestData.find(data => data.dId == dId);
      const difDates = (Date.now()) - (new Date(data!.iat).getTime())
      if (difDates > 30000) {
        return `This device has not delivered its proof_of_life: ${dId}`;
      }
      return data?.variables[variable];
    } catch (error: any) {
      return error.message;
    }
  };
}

