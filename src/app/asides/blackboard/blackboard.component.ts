import { Component, OnInit } from '@angular/core';
import { DisplayConfig, displayType, sizes } from 'src/app/Interfaces/DisplayConfig.interface';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'blackboard',
  templateUrl: './blackboard.component.html',
  styleUrls: ['./blackboard.component.css']
})
export class BlackboardComponent implements OnInit {

  arrConfig: DisplayConfig[];
  tempConfig: DisplayConfig;
  userVariables: string[];

  constructor(private apiService: ApiService) {
    this.userVariables = [];
    this.tempConfig = {
      displayType: displayType.BooleanDisplay,
      displaySize: 'col-md-3',
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 1000,
      variableId: 'testId',
      variableName: '',
      color: 'rgb(29, 140, 248)',//rba string for color representation
      backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true
    };

    this.arrConfig = [];
  }

  ngOnInit(): void {
    //Rellenar userVariables con las variables del usuario via API !!
  }

  setUpDisplay(index: number): void {

  }

  generateNewDisplay(): void {
    this.arrConfig.push({   //llamada a la api para descargar la blackboard de este usuario OJO!!!!
      displayType: displayType.BooleanDisplay,
      displaySize: 'col-md-3',
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 1000,
      variableId: 'testId',
      variableName: 'DefaultName',
      color: 'rgb(29, 140, 248)',//rba string for color representation
      backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true
    });
  }

}
