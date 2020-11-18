import {Component, Input, SimpleChanges, ViewChild} from '@angular/core';
import * as moment from 'moment';
import { ChartComponent } from 'angular2-chartjs';


@Component({
  selector: 'app-analyticChart',
  templateUrl: './analyticChart.component.html',
  styleUrls: ['./analyticChart.component.css']
})
export class analyticChartComponent {
  // Grab our normal analytic object, organic analytic object and the type of View we want to render.
  @Input() analyticObj;
  @Input() oAnalyticObj;
  @Input() view;
  // ViewChild for the chart component so that we can update/destroy the chart.
  @ViewChild(ChartComponent) chart: ChartComponent;
  // Definitions for our chart.
  type = 'line';
  data = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: []
      },
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  // Use Lifecycle hook to update whenever our Inputs have changed.
  ngOnChanges(changes: SimpleChanges) {
    Object.keys(changes).forEach((change) => {
      let chgs = changes[change];
      let curVal = chgs.currentValue;
      let preVal = chgs.previousValue;
      if (curVal != preVal && curVal != undefined) {
        this.generateChart();
      }
    });
  }

  /**
   *   Function for generating the chart, checks to see what data needs to be generated based on the view, appends it to the appropriate
   *   array then sets that array in the proper chart property.
   */
  public generateChart() {
    let labelArray = [];
    let data = [];
    let oData = [];
    if (this.view === 0 || this.view === 2) {
      this.analyticObj.forEach(function (value) {
        labelArray.push(moment(value.date).format('DD'));
        data.push(value.metricQty);
      });
    }
    if (this.view === 1 || this.view === 2) {
      this.oAnalyticObj.forEach(function (value) {
        oData.push(value.metricQty);
      });
      if (this.view === 1) {
        this.oAnalyticObj.forEach(function (value) {
          labelArray.push(moment(value.date).format('DD'));
        });
      }
    }
    this.data.labels = labelArray;
    if(this.view === 0) {

      this.data.datasets = [
        {
          label: 'Regular Data',
          data: data,
          backgroundColor: [
            'rgba(94, 56, 249, 0.26)'
          ],
        }
      ];
    }else if (this.view === 1) {
      this.data.datasets = [
        {
          label : 'Organic Data',
          data: oData,
          backgroundColor: [
            'rgba(67, 238, 70, 0.26)'
          ],
        }
      ];
    } else {
      this.data.datasets = [
        {
          label: 'Regular Data',
          data: data,
          backgroundColor: [
            'rgba(94, 56, 249, 0.26)'
          ],
        },
        {
          label: 'Organic Data',
          data: oData,
          backgroundColor: [
            'rgba(67, 238, 70, 0.56)'
          ],
        }
      ];
    }
    this.chart.chart.update();
  }
}
