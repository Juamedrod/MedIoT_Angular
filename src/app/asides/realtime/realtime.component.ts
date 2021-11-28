import { Component, OnInit } from '@angular/core';
import { DisplayConfig, displayType } from 'src/app/Interfaces/DisplayConfig.interface';

@Component({
  selector: 'realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {
  arrConfig: DisplayConfig[];

  constructor() {
    this.arrConfig = [{
      displayType: displayType.BooleanDisplay,
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 1000,
      variableId: 'testId',
      variableName: 'DefaultName',
      color: 'rgb(29, 140, 248)',//rba string for color representation
      backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true
    }, {
      displayType: displayType.BooleanDisplay,
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 2000,
      variableId: 'testId',
      variableName: 'DefaultName',
      color: 'rgb(29, 140, 248)',//rba string for color representation
      backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true
    }, {
      displayType: displayType.BooleanDisplay,
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 3000,
      variableId: 'testId',
      variableName: 'DefaultName',
      color: 'rgb(29, 140, 248)',//rba string for color representation
      backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true
    }, {
      displayType: displayType.BooleanDisplay,
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 3000,
      variableId: 'testId',
      variableName: 'DefaultName',
      color: 'rgb(29, 140, 248)',//rba string for color representation
      backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true
    }];
  }

  ngOnInit(): void {
  }

}
