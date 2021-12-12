import { ElementRef, Injectable } from '@angular/core';
import Chart from 'chart.js/auto';
import { barChartConfig, lineChartConfig, pieChartConfig, polarAreaConfig } from '../Interfaces/chartDatasets.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  /**
   * Function generator of a Line Chart
   * @param chart Reference to the canvas element in the html.
   * @param config Its a lineChartConfig interfaced object with all the data needed to configure a Line Chart 
   * @returns The chart itself reference to be set on the canvas.
   */
  lineChart(chart: ElementRef, config: lineChartConfig): Chart {
    const unit = (config.unit || '')
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
            //max: 100
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return value + ' ' + unit;
              }
            }
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
   * Function generator of a Bar Chart
   * @param chart Reference to the canvas element in the html.
   * @param config Its a barChartConfig interfaced object with all the data needed to configure a Bar Chart 
   * @returns The chart itself reference to be set on the canvas.
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
            beginAtZero: true,

          }
        }
      }
    });
  }

  /**
   * Function generator of a Pie Chart
   * @param chart Reference to the canvas element in the html.
   * @param config Its a pieChartConfig interfaced object with all the data needed to configure a pie chart 
   * @returns The chart itself reference to be set on the canvas.
   */
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

  /**
  * Function generator of a PolarArea Chart
  * @param chart Reference to the canvas element in the html.
  * @param config Its a pieChartConfig interfaced object with all the data needed to configure a PolarArea chart 
  * @returns The chart itself reference to be set on the canvas.
  */
  polarChart(chart: ElementRef, config: polarAreaConfig): Chart {
    return new Chart(chart.nativeElement, {
      type: 'polarArea',
      data: {
        labels: [],
        datasets: [{
          label: config.variableName,
          data: [],
          backgroundColor: config.colors,
        }]
      },
    });
  }

  /**
   * Function to add a new value to the chart
   * @param chart Chart instance reference
   * @param label the label for this data value
   * @param data the value itself of the variable
   */
  addData(chart: Chart, label: any, data: any) {
    chart.data.labels!.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  /**
   * Function to remove the first value and label.
   * FIFO remove style, first in, first out.
   * @param chart Chart instance reference
   */
  removeData(chart: Chart) {
    chart.data.labels!.shift();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
  }

  /**
   * Reset the actual data for this chart
   * @param chart Chart instance reference
   */
  resetChart(chart: Chart) {
    chart.data.labels = [];
    chart.data.datasets.forEach((dataset) => {
      dataset.data = [];
    });
  }
}