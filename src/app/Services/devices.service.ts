import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../Interfaces/device.interface';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  devices: Device[];

  constructor(private httpClient: HttpClient) {
    this.devices = [{
      deviceType: 'esp32',
      dId: '12345678abcdefgh',
      description: 'El mejor sistema embebido para el hogar y la Industria 4.0',
      nickname: 'ESP-32 humedadTemp',
      variables: ['humedad', 'temp'],
    },
    {
      deviceType: 'esp32',
      dId: '87654321abcdefgh',
      nickname: 'ESP-32 humedadTemp',
      description: 'El best mejor sistema embebido para el hogar y la Industria 4.0',
      variables: ['humedad', 'temp'],
    }];
  }

  /**
   * Get All devices for this user from the API.
   */
  getAll(): Device[] {
    return this.devices;
  }

  create(device: Device): void {
    this.devices.push(device);
    //http petition to create a new device
  }

  edit(id: string): void {
    //http petition to edit an existing device
  }

  remove(id: string): void {
    //http petition to remove an existing user
  }
}
