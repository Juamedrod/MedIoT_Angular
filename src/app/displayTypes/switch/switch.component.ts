import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DisplayConfig, displayType } from 'src/app/Interfaces/DisplayConfig.interface';

@Component({
  selector: 'switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {
  @Input() displayConfig: DisplayConfig;
  variableState: boolean;



  constructor() {
    this.displayConfig = {
      displayType: displayType.Switch,
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 1000,
      variableId: 'testId',
      variableName: 'DefaultName',
      color: 'rgb(29, 140, 248)',//rba string for color representation
      backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true
    }
    this.variableState = false;
  }

  ngOnInit(): void {
  }

  changeState($event: any) {
    this.variableState = $event.target.checked
    const jsonState = {
      variableId: this.displayConfig.variableId,
      newState: this.variableState
    }
    console.log(jsonState);//cambiar por la llamada a la api
  }
}
