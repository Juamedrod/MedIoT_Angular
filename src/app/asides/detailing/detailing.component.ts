import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/Interfaces/device.interface';
import { DevicesService } from 'src/app/Services/devices.service';
import { ESP32, RASPI, ARDUINO } from 'src/assets/deviceDetails/deviceDetails';

@Component({
  selector: 'app-detailing',
  templateUrl: './detailing.component.html',
  styleUrls: ['./detailing.component.css']
})
export class DetailingComponent implements OnInit {
  selectedDevice?: Device;
  devices: Device[];
  completeDescription: string[];

  constructor(private deviceService: DevicesService) {
    this.devices = [];
    this.completeDescription = []
  }

  async ngOnInit() {
    this.devices = await this.deviceService.getAll();
  }

  onSelectChange1($event: any) {
    if ($event.target.value === '') {
      this.completeDescription = [];
      this.selectedDevice = undefined;
      return;
    }
    this.selectedDevice = this.devices[$event.target.value];
    switch (this.selectedDevice.deviceType) {
      case 'esp32':
        this.completeDescription = ESP32;
        break;
      case 'raspberry':
        this.completeDescription = RASPI;
        break;
      case 'arduino':
        this.completeDescription = ARDUINO;
        break;
      default:
        this.completeDescription = [];
        break;
    }
  }

  async deleteDevice() {
    try {
      const response = await this.deviceService.remove(this.selectedDevice!.dId);
    } catch (error) {
      console.log({ error });
    }
  }

  async updateDevice() {
    try {
      const response = await this.deviceService.edit(this.selectedDevice!);
      console.log(response);
    } catch (error) {
      console.log({ error });
    }
  }

}
