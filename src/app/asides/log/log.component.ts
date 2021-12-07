import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/Services/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  logs: any;

  constructor(private logService: LogService) { }

  async ngOnInit() {
    try {
      let response = await this.logService.getLogs();
      response = response.slice(0, response.length - 1);
      response = `[${response}]`;
      this.logs = JSON.parse(response);
    } catch (error) {
      console.log(error);
    }
  }
}

