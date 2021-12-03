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
    /*  this.arrConfig = [{   //llamada a la api para descargar la blackboard de este usuario OJO!!!!
       displayType: displayType.BooleanDisplay,
       displaySize: 'col-md-3',
       maxDataRepresentation: 10, //max number of inputs to display
       refreshInterval: 1000,
       variableId: 'testId',
       variableName: 'DefaultName',
       color: 'rgb(29, 140, 248)',//rba string for color representation
       backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
       fillArea: true
     }, {
       displayType: displayType.Switch,
       displaySize: 'col-md-3',
       maxDataRepresentation: 10, //max number of inputs to display
       refreshInterval: 2000,
       variableId: 'testId',
       variableName: 'DefaultName',
       color: 'rgb(29, 140, 248)',//rba string for color representation
       backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
       fillArea: true
     }, {
       displayType: displayType.BarChart,
       displaySize: 'col-md-6',
       maxDataRepresentation: 10, //max number of inputs to display
       refreshInterval: 2000,
       variableId: 'testId',
       variableName: 'DefaultName',
       color: 'rgb(29, 140, 248)',//rba string for color representation
       backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
       fillArea: true
     }, {
       displayType: displayType.LineChart,
       displaySize: 'col-md-12',
       maxDataRepresentation: 16, //max number of inputs to display
       refreshInterval: 3000,
       variableId: 'testId',
       variableName: 'DefaultName',
       color: 'rgb(29, 140, 248)',//rba string for color representation
       backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
       fillArea: true
     }]; */

    this.arrConfig = []
  }

  ngOnInit(): void {
    this.arrConfig = this.blackboardService.getArrConfig();
  }

}
