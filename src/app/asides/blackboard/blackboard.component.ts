import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/Interfaces/device.interface';
import { DisplayConfig, displayType } from 'src/app/Interfaces/DisplayConfig.interface';
import { BlackboardService } from 'src/app/Services/blackboard.service';
import { DevicesService } from 'src/app/Services/devices.service';

@Component({
  selector: 'blackboard',
  templateUrl: './blackboard.component.html',
  styleUrls: ['./blackboard.component.css']
})
export class BlackboardComponent implements OnInit {
  arrConfig: DisplayConfig[];//this array saves the user configuration on all displays
  tempConfig: any;//this var saves the actual state in teh modal for the display being edited
  devices: Device[];//the devices this user has registered.
  activeDisplay: number;//the actual blackboard display that has opened the modal for edition.
  varsOfThisDevice: string[];//variables asociated to the device selected in the modal
  displayTypes: string[] = [];
  saved: boolean;

  constructor(private devicesService: DevicesService, private blackboardService: BlackboardService) {
    this.setUpDisplayTypes();
    this.saved = false;
    this.varsOfThisDevice = [];
    this.activeDisplay = 0;
    this.arrConfig = [];
    this.devices = [];
    this.tempConfig = {
      dId: '',
      _displayType: "",
      displaySize: '',
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 1000,
      variableId: '',
      variableName: '',
      _color: 'rgb(29, 140, 248)',//rgba string for color representation
      _backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true,
      chartName: '',
      tension: 0,
      borderWidth: 1,
      scaleWithHover: 1
    };
  }

  async ngOnInit() {
    this.devices = await this.devicesService.getAll();
    const response = await this.blackboardService.getArrConfig();
    if (response.length === 0) {
      this.blackboardService.storeArrConfig(this.arrConfig);
    } else {
      this.arrConfig = response[0].arrConfig;
    }
  }

  /**
   * Load the DB saved state of the display blacboard via API
   */
  setUpDisplay(): void {
    //llamada al servicio para traer los datos de la API
  }

  /**
  * Save the temporary configuration to be final.
  */
  async saveDisplayConfig() {
    const newDisplayConfig = {
      dId: this.tempConfig.dId,
      displayType: parseInt(this.tempConfig._displayType),
      displaySize: this.tempConfig.displaySize,
      maxDataRepresentation: this.tempConfig.maxDataRepresentation, //max number of inputs to display
      refreshInterval: this.tempConfig.refreshInterval,
      variableId: this.tempConfig.variableId,
      variableName: this.tempConfig.variableId,
      color: this.tempConfig._color,//rgba string for color representation
      backgroundColorRGBA: this.tempConfig._backgroundColorRGBA,
      fillArea: this.tempConfig.fillArea,
      chartName: this.tempConfig.chartName,
      tension: this.tempConfig.tension,
      borderWidth: this.tempConfig.borderWidth,
      scaleWithHover: this.tempConfig.scaleWithHover
    };

    this.arrConfig[this.activeDisplay] = newDisplayConfig;
    this.saved = true;
    await this.blackboardService.updateArrConfig(this.arrConfig);
  }

  /**
   * SEt up the variables of the selected device
   */
  setVariables(dId: string) {
    try {
      const device = this.devices.find(device => device.dId == dId);
      this.varsOfThisDevice = device!.variables;
    } catch (error: any) {
      console.log({ error: error.message });
    }
  }

  /**
   * Set the actual index for the display being edited
   */
  setActiveDisplay(index: number) {
    this.activeDisplay = index;
    this.savedCentinelReset();
    this.setVariables(this.arrConfig[index].dId!);
    this.tempConfig.dId = this.arrConfig[index].dId;
    this.tempConfig._displayType = this.arrConfig[index].displayType;
    this.tempConfig.displaySize = this.arrConfig[index].displaySize;
    this.tempConfig.maxDataRepresentation = this.arrConfig[index].maxDataRepresentation; //max number of inputs to display
    this.tempConfig.refreshInterval = this.arrConfig[index].refreshInterval;
    this.tempConfig.variableId = this.arrConfig[index].variableId;
    this.tempConfig.variableName = this.arrConfig[index].variableName;
    this.tempConfig._color = this.arrConfig[index].color;//rgba string for color representation
    this.tempConfig._backgroundColorRGBA = this.arrConfig[index].backgroundColorRGBA;
    this.tempConfig.fillArea = this.arrConfig[index].fillArea;
    this.tempConfig.chartName = this.arrConfig[index].chartName;
    this.tempConfig.tension = this.arrConfig[index].tension;
    this.tempConfig.borderWidth = this.arrConfig[index].borderWidth;
    this.tempConfig.scaleWithHover = this.arrConfig[index].scaleWithHover;
  }

  /**
   * Function to add one more display type to the blackboard
   */
  generateNewDisplay(): void {
    this.arrConfig.push({
      dId: '',
      displayType: displayType.LineChart,
      displaySize: 'col-md-3',
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 1000,
      variableId: '',
      variableName: 'DefaultName',
      color: 'rgb(29, 140, 248)',//rba string for color representation
      backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true
    });
  }

  /**
   * helper function
   */
  resetTemp() {
    this.tempConfig = {
      dId: '',
      _displayType: displayType.BooleanDisplay,
      displaySize: '',
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 1000,
      variableId: '',
      variableName: '',
      _color: 'rgb(29, 140, 248)',//rgba string for color representation
      _backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true,
      chartName: '',
      tension: 0,
      borderWidth: 1,
      scaleWithHover: 1
    };
  }

  /**
   *  Remove the display from the list
   */
  async removeDisplay(index: number) {
    confirm('¿Borrar dispositivo?');
    this.arrConfig.splice(index, 1);
    const response = await this.blackboardService.updateArrConfig(this.arrConfig);
  }

  /**
   * Set up the display types dinamically in order to this feature to scale without extra coding.
   * Allow the select input to scale the successive inputs without coding it, it automatically scale
   */
  setUpDisplayTypes() {
    this.displayTypes = [...Object.keys(displayType)].filter(key => {
      if (!isNaN(parseInt(key))) return false;
      return true;
    });
  }

  savedCentinelReset() {
    this.saved = false;
    this.varsOfThisDevice = [];
    this.resetTemp();
  }
}
