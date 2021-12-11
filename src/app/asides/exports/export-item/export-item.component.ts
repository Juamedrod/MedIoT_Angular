import { Component, Input, OnInit } from '@angular/core';
import { Device } from 'src/app/Interfaces/device.interface';
import { msgType } from 'src/app/Interfaces/message.interface';
import { LogService } from 'src/app/Services/log.service';
import { MessagesSystemService } from 'src/app/Services/messages-system.service';

@Component({
  selector: 'export-item',
  templateUrl: './export-item.component.html',
  styleUrls: ['./export-item.component.css']
})
export class ExportItemComponent implements OnInit {
  selectExport: string;
  downloadURL: string;
  maxLimitOfData: string;
  @Input() device!: Device;

  constructor(private logService: LogService, private messageService: MessagesSystemService) {
    this.selectExport = '';
    this.maxLimitOfData = '0';
    this.downloadURL = 'http://192.168.1.39:3000/';
  }

  ngOnInit(): void {
  }

  async downloadSCV(dId: string) {
    try {
      const response = await this.logService.downloadCSV(dId, this.maxLimitOfData, this.selectExport);
      window.location.href = `${this.downloadURL}${response.url}`;
      if (response.url) {
        this.messageService.newMessage({ message: 'File download ready!', messageType: msgType.success });
        return response.url;
      }
      this.messageService.newMessage({ message: 'An error has ocurred!', messageType: msgType.error });
      return '';
    } catch (error) {
      this.messageService.newMessage({ message: 'An error has ocurred!', messageType: msgType.error });
      return '';
    }
  }

}
