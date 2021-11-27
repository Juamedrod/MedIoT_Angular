import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DisplayConfig, displayType } from '../Interfaces/DisplayConfig.interface';
import { ChartService } from '../Services/chart.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() displayConfig: DisplayConfig;
  @ViewChild('myChart') myChart!: ElementRef;
  chart: any;
  interval: any;


  constructor(private chartService: ChartService) {
    this.displayConfig = {
      displayType: displayType.LineChart,
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 1000,
      variableName: 'DefaultName',
      color: 'rgb(29, 140, 248)',//rba string for color representation
      backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    switch (this.displayConfig.displayType) {
      case (displayType.LineChart):
        this.chart = this.chartService.lineChart(this.myChart, {
          variableName: this.displayConfig.variableName,
          color: this.displayConfig.color,
          backgroundColorRGBA: this.displayConfig.backgroundColorRGBA,
          fillArea: this.displayConfig.fillArea!,
          tension: this.displayConfig.tension!,
          chartName: this.displayConfig.chartName
        })

        this.interval = setInterval(() => {
          if (this.chart.data.labels.length >= this.displayConfig.maxDataRepresentation) {
            this.chartService.removeData(this.chart);
            this.chartService.addData(this.chart, Math.trunc(Math.random() * 90), Math.trunc(Math.random() * 90));//Api call            
          } else {
            this.chartService.addData(this.chart, Math.trunc(Math.random() * 90), Math.trunc(Math.random() * 90));//Api call
          }
        }, this.displayConfig.refreshInterval);

        break;

      case (displayType.BarChart):
        this.chart = this.chartService.barChart(this.myChart, {
          variableName: this.displayConfig.variableName,
          color: this.displayConfig.color,
          backgroundColorRGBA: this.displayConfig.backgroundColorRGBA,
          borderWidth: this.displayConfig.borderWidth!
        });

        this.interval = setInterval(() => {
          if (this.chart.data.labels.length >= this.displayConfig.maxDataRepresentation) {
            this.chartService.removeData(this.chart);
            this.chartService.addData(this.chart, Math.trunc(Math.random() * 90), Math.trunc(Math.random() * 90));//Api call            
          } else {
            this.chartService.addData(this.chart, Math.trunc(Math.random() * 90), Math.trunc(Math.random() * 90));//Api call
          }
        }, this.displayConfig.refreshInterval);

        break;

      case (displayType.PieChart):
        this.chart = this.chartService.pieChart(this.myChart, {
          variableName: this.displayConfig.variableName,
          colors: this.displayConfig.colors!,
          scaleWithHover: this.displayConfig.scaleWithHover!
        });
        this.chart.data.labels = ['1', '2', '3'];
        this.chart.data.datasets[0].data = [50, 25, 25];
        this.chart.update();
        break;

    }
  }
}
