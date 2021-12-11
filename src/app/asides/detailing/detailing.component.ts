import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/Interfaces/device.interface';
import { msgType } from 'src/app/Interfaces/message.interface';
import { DevicesService } from 'src/app/Services/devices.service';
import { MessagesSystemService } from 'src/app/Services/messages-system.service';
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
  select1: string;

  constructor(private deviceService: DevicesService, private messageService: MessagesSystemService) {
    this.devices = [];
    this.completeDescription = []
    this.select1 = ''
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
      await this.deviceService.remove(this.selectedDevice!.dId);
      this.devices = await this.deviceService.getAll();
      this.messageService.newMessage({ message: 'Device deleted successfully', messageType: msgType.success });
      this.select1 = '';
      this.selectedDevice = undefined;
      this.completeDescription = [];
    } catch (error) {
      this.messageService.newMessage({ message: 'Error deleting Device', messageType: msgType.error });
    }
  }

  async updateDevice() {
    try {
      const response = await this.deviceService.edit(this.selectedDevice!);
      this.messageService.newMessage({ message: 'Update success', messageType: msgType.success });
    } catch (error) {
      this.messageService.newMessage({ message: 'Error updating device', messageType: msgType.error });
    }
  }
}
