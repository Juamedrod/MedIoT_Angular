import { Component, Input, OnInit } from '@angular/core';
import { DisplayConfig, displayType } from 'src/app/Interfaces/DisplayConfig.interface';

@Component({
  selector: 'boolean-display',
  templateUrl: './boolean-display.component.html',
  styleUrls: ['./boolean-display.component.css']
})
export class BooleanDisplayComponent implements OnInit {
  variableState: boolean;
  @Input() displayConfig: DisplayConfig;

  constructor() {
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
  }

  updateState() {
    setInterval(() => {
      //api call to check state
      this.variableState = !this.variableState;
    }, this.displayConfig.refreshInterval);
  }
}
