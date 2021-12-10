import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/Interfaces/device.interface';
import { DevicesService } from 'src/app/Services/devices.service';
import { LogService } from 'src/app/Services/log.service';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.css']
})
export class ExportsComponent implements OnInit {

  devices: Device[];

  constructor(private deviceService: DevicesService) {
    this.devices = [];
  }

  async ngOnInit() {
    this.devices = await this.deviceService.getAll();
  }
}
