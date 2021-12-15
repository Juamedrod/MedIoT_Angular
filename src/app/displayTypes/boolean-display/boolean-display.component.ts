import { Component, Input, OnInit } from '@angular/core';
import { DisplayConfig, displayType } from 'src/app/Interfaces/DisplayConfig.interface';
import { RealtimeService } from 'src/app/Services/realtime.service';

@Component({
  selector: 'boolean-display',
  templateUrl: './boolean-display.component.html',
  styleUrls: ['./boolean-display.component.css']
})
export class BooleanDisplayComponent implements OnInit {
  variableState: boolean;
  @Input() displayConfig: DisplayConfig;
  interval: any;
  icon: string = '';

  constructor(private realtimeService: RealtimeService) {
    this.displayConfig = {
      displayType: displayType.BooleanDisplay,
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 3000,
      variableId: 'testId',
      variableName: 'Default Name',
      color: 'rgb(29, 140, 248)',//rba string for color representation
      backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true
    }
    this.variableState = false;

  }

  ngOnInit(): void {
    this.updateState();
    this.icon = this.displayConfig.icon!;
  }

  updateState() {
    this.interval = setInterval(() => {
      const response = this.realtimeService.getVariable(this.displayConfig.dId!, this.displayConfig.variableId);
      if (typeof (response) == 'boolean') {
        this.variableState = response;
      } else {
        this.variableState = (response === 'true');
      }
    }, this.displayConfig.refreshInterval);
  }

  ngOnDestroy() {
    window.clearInterval(this.interval);
  }
}
