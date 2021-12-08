import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RealtimeService } from 'src/app/Services/realtime.service';
import { DisplayConfig, displayType } from '../../Interfaces/DisplayConfig.interface';
import { ChartService } from '../../Services/chart.service';

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
  errors: { error: boolean, msg: string };

  constructor(private chartService: ChartService, private realtimeService: RealtimeService) {
    this.errors = { error: false, msg: '' };
    this.displayConfig = {
      displayType: displayType.LineChart,
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 1000,
      variableId: 'testId',
      variableName: 'DefaultName',
      color: 'rgb(29, 140, 248)',//rba string for color representation
      backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    /**
     * Initialize the chart
     */
    switch (this.displayConfig.displayType) {
      case (displayType.LineChart)://LINE
        this.chart = this.chartService.lineChart(this.myChart, {
          variableName: this.displayConfig.variableName,
          color: this.displayConfig.color,
          backgroundColorRGBA: this.displayConfig.backgroundColorRGBA,
          fillArea: this.displayConfig.fillArea!,
          tension: this.displayConfig.tension!,
          chartName: this.displayConfig.chartName
        })

        this.startInterval();
        break;

      case (displayType.BarChart)://BAR CHART
        this.chart = this.chartService.barChart(this.myChart, {
          variableName: this.displayConfig.variableName,
          color: this.displayConfig.color,
          backgroundColorRGBA: this.displayConfig.backgroundColorRGBA,
          borderWidth: this.displayConfig.borderWidth!
        });

        this.startInterval();
        break;

      case (displayType.PieChart)://PIE
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

  startInterval() {
    this.interval = setInterval(() => {
      const varValue = this.realtimeService.getVariable(this.displayConfig.dId!, this.displayConfig.variableId);
      if (isNaN(varValue)) {
        this.errors.error = true;
        this.errors.msg = varValue;
        return;
      }
      this.errors.error = false;
      if (this.chart.data.labels.length >= this.displayConfig.maxDataRepresentation) {
        this.chartService.removeData(this.chart);
        this.chartService.addData(this.chart, new Date().toLocaleString(), varValue);//Api call  using variableId          
      } else {
        this.chartService.addData(this.chart, new Date().toLocaleString(), varValue);//Api call using variableId
      }
    }, this.displayConfig.refreshInterval);
  }

  stopInterval() {
    window.clearInterval(this.interval);
  }

  ngOnDestroy() {
    window.clearInterval(this.interval);
  }
}
