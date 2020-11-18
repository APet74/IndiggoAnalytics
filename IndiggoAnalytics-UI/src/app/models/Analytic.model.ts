import {Metric} from './Metric.model';


export class Analytic {
  constructor(
    public date: Date,
    public metricQty: number,
    public metricID: number,
    public metric: Metric,
    public organic: boolean

  ) { }
}
