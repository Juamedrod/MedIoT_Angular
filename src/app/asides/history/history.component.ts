import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { lineChartConfig } from 'src/app/Interfaces/chartDatasets.interfaces';
import { Data } from 'src/app/Interfaces/data.interface';
import { Device } from 'src/app/Interfaces/device.interface';
import { ChartService } from 'src/app/Services/chart.service';
import { DevicesService } from 'src/app/Services/devices.service';
import { HistoricService } from 'src/app/Services/historic.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @ViewChild('graph') chart!: ElementRef;
  numberOfDatas: number;
  visualizationToggle: boolean;
  datas: Data[];
  devices: Device[];
  variables: string[];
  mainSelectClicked: boolean;
  selectedVar: string;
  selectedDevice: string;
  lineChartconfig: lineChartConfig;
  chartRef: any;

  constructor(private deviceService: DevicesService, private historicService: HistoricService, private chartService: ChartService) {
    this.selectedDevice = '';
    this.selectedVar = '';
    this.numberOfDatas = 1;
    this.visualizationToggle = false;
    this.datas = [];
    this.devices = [];
    this.variables = [];
    this.mainSelectClicked = false;
    this.lineChartconfig = {
      chartName: this.selectedDevice,
      variableName: this.selectedVar,
      color: '#8d1d55',
      backgroundColorRGBA: '#42b883',
      fillArea: true,
      tension: 0.5
    }
  }

  async ngOnInit() {
    this.devices = await this.deviceService.getAll();
  }

  ngAfterViewInit() {
    this.chartRef = this.chartService.lineChart(this.chart, this.lineChartconfig);
  }

  onSelectChange() {
    this.mainSelectClicked = true;
    this.setVariables(this.selectedDevice);
  }

  /**
   * Searh data into the API when user change the value in the slider
   */
  async findData() {
    this.datas = await this.historicService.getData(this.selectedDevice, this.numberOfDatas.toString());
    this.chartService.resetChart(this.chartRef);
    for (const data of this.datas) {
      this.chartService.addData(this.chartRef, data.iat, data.variables[this.selectedVar]);
    }
  }

  /**
  * SEt up the variables of the selected device
  */
  setVariables(dId: string) {
    try {
      const device = this.devices.find(device => device.dId == dId);
      this.variables = device!.variables;
    } catch (error) {
      console.log({ error });
    }
  }
}
