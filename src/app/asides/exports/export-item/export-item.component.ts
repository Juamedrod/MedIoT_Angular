import { Component, Input, OnInit } from '@angular/core';
import { Device } from 'src/app/Interfaces/device.interface';
import { msgType } from 'src/app/Interfaces/message.interface';
import { HistoricService } from 'src/app/Services/historic.service';
import { LogService } from 'src/app/Services/log.service';
import { MessagesSystemService } from 'src/app/Services/messages-system.service';
import { environment } from 'src/environments/environment';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

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

  constructor(private historicService: HistoricService, private messageService: MessagesSystemService) {
    this.selectExport = '';
    this.maxLimitOfData = '0';
    this.downloadURL = environment.baseURL;
  }

  ngOnInit(): void {
  }

  async downloadSCV(dId: string) {
    try {
      const response = await this.historicService.getData(dId, this.maxLimitOfData);
      if (response.length > 0) {
        const data = [];
        switch (this.selectExport) {
          case 'variables':
            let varKeys = Object.keys(response[0].variables);
            for (const item of response) {
              data.push({
                dId: item.dId,
                iat: item.iat,
                ...item.variables
              });
            }
            var options = {
              fieldSeparator: ',',
              quoteStrings: '"',
              decimalseparator: '.',
              showLabels: true,
              showTitle: true,
              title: 'Your title',
              useBom: true,
              noDownload: false,
              headers: ["dId", "iat", ...varKeys],
              useHeader: true,
              nullToEmptyString: true,
            };
            new AngularCsv(data, `${dId}.csv`, options);
            break;

          default:
            for (const item of response) {
              let obj = {
                dId: item.dId,
                iat: item.iat,
                ...item.variables[this.selectExport]
              }
              obj[this.selectExport] = item.variables[this.selectExport];
              data.push(obj);
            }
            var options = {
              fieldSeparator: ',',
              quoteStrings: '"',
              decimalseparator: '.',
              showLabels: true,
              showTitle: true,
              title: 'Your title',
              useBom: true,
              noDownload: false,
              headers: ["dId", "iat", this.selectExport],
              useHeader: true,
              nullToEmptyString: true,
            };
            new AngularCsv(data, `${dId}.csv`, options);
            break;
        }

      }
      this.messageService.newMessage({ message: 'File download ready!', messageType: msgType.success });
      return '';
    } catch (error) {
      this.messageService.newMessage({ message: 'An error has ocurred!', messageType: msgType.error });
      return '';
    }
  }
}
