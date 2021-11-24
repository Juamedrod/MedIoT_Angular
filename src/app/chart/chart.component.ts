import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartService } from '../Services/chart.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef;
  chart: any;
  interval: any;

  constructor(private chartService: ChartService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    /*  this.chart = this.chartService.lineChart(this.myChart, {
       variableName: 'temp', color: 'rgb(255, 0, 0)', backgroundColorRGBA: 'rgba(255, 0, 0, 0.1)',
       fillArea: true, tension: 0.4, chartName: 'Mi variable'
     }) */

    this.chart = this.chartService.barChart(this.myChart, {
      variableName: 'ematopeya',
      color: 'rbg(255,0,0)', backgroundColorRGBA: 'rgba(255,0,0,0.6)',
      borderWidth: 2
    });

    setInterval(() => {
      this.chartService.addData(this.chart, 12, Math.trunc(Math.random() * 90));
    }, 1000);
  }
}
