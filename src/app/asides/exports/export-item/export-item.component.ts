import { Component, Input, OnInit } from '@angular/core';
import { Device } from 'src/app/Interfaces/device.interface';
import { LogService } from 'src/app/Services/log.service';

@Component({
  selector: 'export-item',
  templateUrl: './export-item.component.html',
  styleUrls: ['./export-item.component.css']
})
export class ExportItemComponent implements OnInit {
  selectExport: string;
  downloadURL: string;
  @Input() device!: Device;

  constructor(private logService: LogService) {
    this.selectExport = '';
    this.downloadURL = 'http://192.168.1.39:3000/';
  }

  ngOnInit(): void {
  }

  async downloadSCV(dId: string) {
    try {
      const response = await this.logService.downloadCSV(dId, this.selectExport);
      window.location.href = `${this.downloadURL}${response.url}`;
      if (response.url) return response.url;
      return '';
    } catch (error) {
      return '';
    }
  }

}
