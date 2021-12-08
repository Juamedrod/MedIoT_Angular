import { Component, OnInit } from '@angular/core';
import { DisplayConfig, displayType } from 'src/app/Interfaces/DisplayConfig.interface';
import { BlackboardService } from 'src/app/Services/blackboard.service';
import { RealtimeService } from 'src/app/Services/realtime.service';

@Component({
  selector: 'realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {
  arrConfig: DisplayConfig[];
  interval: any;
  DBsaverCooldown: number;

  constructor(private blackboardService: BlackboardService, private realtimeService: RealtimeService) {
    this.arrConfig = [];
    this.DBsaverCooldown = 3000;
  }

  async ngOnInit() {
    const response = await this.blackboardService.getArrConfig();
    if (response.length != 0) this.arrConfig = response[0].arrConfig;
    this.realtimeService.getDevices();
    this.interval = setInterval(() => {
      this.realtimeService.dataSnapshot();
    }, this.DBsaverCooldown);
  }

  ngOnDestroy() {
    window.clearInterval(this.interval);
  }
}
