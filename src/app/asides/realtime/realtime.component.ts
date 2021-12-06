import { Component, OnInit } from '@angular/core';
import { DisplayConfig, displayType } from 'src/app/Interfaces/DisplayConfig.interface';
import { BlackboardService } from 'src/app/Services/blackboard.service';



@Component({
  selector: 'realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {
  arrConfig: DisplayConfig[];

  constructor(private blackboardService: BlackboardService) {
    this.arrConfig = []
  }

  async ngOnInit() {
    const response = await this.blackboardService.getArrConfig();
    if (response.length != 0) this.arrConfig = response[0].arrConfig;
  }

}
