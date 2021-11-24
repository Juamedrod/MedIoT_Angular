import { ElementRef, Injectable } from '@angular/core';
import Chart from 'chart.js/auto';
import { barChartConfig, lineChartConfig, pieChartConfig } from '../Interfaces/chartDatasets.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  /**
   * LINE CHART INSTANTIATION 
   */
  lineChart(chart: ElementRef, config: lineChartConfig): Chart {
    return new Chart(chart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: config.variableName,
          borderColor: config.color,
          data: [],
          backgroundColor: config.backgroundColorRGBA,
          fill: config.fillArea,
          tension: config.tension
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: config.chartName || ''
          }
        }
      },
    });
  }

  /**
   * BAR CHART INSTANTIATION 
   */
  barChart(chart: ElementRef, config: barChartConfig): Chart {
    return new Chart(chart.nativeElement, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: config.variableName,
          borderColor: config.color,
          backgroundColor: config.backgroundColorRGBA,
          data: [],
          borderWidth: config.borderWidth
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  pieChart(chart: ElementRef, config: pieChartConfig): Chart {
    return new Chart(chart.nativeElement, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          label: config.variableName,
          data: [],
          backgroundColor: config.colors,
          hoverOffset: config.scaleWithHover
        }]
      },
    });
  }

  addData(chart: Chart, label: any, data: any) {
    chart.data.labels!.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  removeData(chart: Chart) {
    chart.data.labels!.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }
}