import {Component, OnInit} from '@angular/core';
import {AnalyticService} from '../../services/analytic.service';
import * as moment from 'moment';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-analytic-comp',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class analyticsComponent implements OnInit {
  constructor(private _AS: AnalyticService) { }

  // Definitions of variables being used throughout this page.
  public firstDate;
  public lastDate;
  public users;
  public userMetricSum;
  public sessions;
  public sessionMetricSum;
  public pageViews;
  public pageviewsMetricSum;
  public newUsers;
  public newUsersMetricSum;
  public oUsers;
  public oUsersMetricSum;
  public oSessions;
  public oSessionMetricSum;
  public oPageViews;
  public oPageviewsMetricSum;
  public oNewUsers;
  public oNewUsersMetricSum;
  public viewType = 0;
  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnInit(){
    this.lastDate = moment();
    this.firstDate = moment('2020-11-01');
    this.range.valueChanges.subscribe(val => {
      this.rangeChange();
    });
    this.range.patchValue({
      start: this.firstDate,
      end: this.lastDate
    });
  }

  /**
   *  Takes 2 date parameters, a type parameter and an organic flag to sum the metric as well as determine what to display, organic, regular
   *  or both. If I had time to rewrite I would pull all this into an ambiguous component similar to the chart where we don't care about
   *  the metric type and instead pass those in from a parent page and return the data needed. There are 4 total functions that all work
   *  the same but set different properties for the 4 different analytic types.
   *
   * @param d1
   * @param d2
   * @param type
   * @param organic
   */
  public getUserAnalytic(d1, d2, type, organic){
    this._AS.getAnalytics(d1, d2, type, organic).subscribe(res => {
      if ( organic === 0 ) {
        this.users = res;
        this.userMetricSum = this.sumMetric(this.users);
      } else if (organic === 1) {
        this.oUsers = res;
        this.oUsersMetricSum = this.sumMetric(this.oUsers);
      } else {
        this.users = res.filter( o => o.organic === false);
        this.userMetricSum = this.sumMetric(this.users);
        this.oUsers = res.filter( o => o.organic === true);
        this.oUsersMetricSum = this.sumMetric(this.oUsers);
      }
    });
  }
  public getNewUserAnalytics(d1, d2, type, organic){
    this._AS.getAnalytics(d1, d2, type, organic).subscribe(res => {
      if ( organic === 0 ) {
        this.newUsers = res;
        this.newUsersMetricSum = this.sumMetric(this.newUsers);
      } else if (organic === 1) {
        this.oNewUsers = res;
        this.oNewUsersMetricSum = this.sumMetric(this.oNewUsers);
      } else {
        this.newUsers = res.filter( o => o.organic === false);
        this.newUsersMetricSum = this.sumMetric(this.newUsers);
        this.oNewUsers = res.filter( o => o.organic === true);
        this.oNewUsersMetricSum = this.sumMetric(this.oNewUsers);
      }
    });
  }
  public getSessionsAnalytic(d1, d2, type, organic){
    this._AS.getAnalytics(d1, d2, type, organic).subscribe(res => {
      if ( organic === 0 ) {
        this.sessions = res;
        this.sessionMetricSum = this.sumMetric(this.sessions);
      } else if (organic === 1) {
        this.oSessions = res;
        this.oSessionMetricSum = this.sumMetric(this.oSessions);
      } else {
        this.sessions = res.filter( o => o.organic === false);
        this.sessionMetricSum = this.sumMetric(this.sessions);
        this.oSessions = res.filter( o => o.organic === true);
        this.oSessionMetricSum = this.sumMetric(this.oSessions);
      }
    });
  }
  public getPageviewsAnalytic(d1, d2, type, organic){
    this._AS.getAnalytics(d1, d2, type, organic).subscribe(res => {
      if ( organic === 0 ) {
        this.pageViews = res;
        this.pageviewsMetricSum = this.sumMetric(this.pageViews);
      } else if (organic === 1) {
        this.oPageViews = res;
        this.oPageviewsMetricSum = this.sumMetric(this.oPageViews);
      } else {
        this.pageViews = res.filter( o => o.organic === false);
        this.pageviewsMetricSum = this.sumMetric(this.pageViews);
        this.oPageViews = res.filter( o => o.organic === true);
        this.oPageviewsMetricSum = this.sumMetric(this.oPageViews);
      }
    });
  }

  /**
   * Takes an object array and then reduces it to sum the quantity of the metricQty property
   * @param obj
   */
  public sumMetric(obj){
    // tslint:disable-next-line:only-arrow-functions
    if (obj.length != 0) {
      const test = obj.map(a => a.metricQty).reduce(function(a, b)
      {
        return a + b;
      });
      return test;
    }
    return 0;

  }

  /**
   * Takes the view as an argument and will get the different analytics from the functions above.
   * @param view
   */
  public onRadioChange(view){
    this.viewType = view;
    this.getUserAnalytic(this.firstDate.format('yyyy-MM-DD'), this.lastDate.format('yyyy-MM-DD'), 1, view);
    this.getSessionsAnalytic(this.firstDate.format('yyyy-MM-DD'), this.lastDate.format('yyyy-MM-DD'), 2, view);
    this.getPageviewsAnalytic(this.firstDate.format('yyyy-MM-DD'), this.lastDate.format('yyyy-MM-DD'), 3, view);
    this.getNewUserAnalytics(this.firstDate.format('yyyy-MM-DD'), this.lastDate.format('yyyy-MM-DD'), 4, view);
  }

  /**
   * This is called from the OnInit lifecycle hook which establishes a subscription on the ViewType variable changing. Makes sure both the
   * start and end date are changed and set before calling the data, otherwise the service will return an error because it needs both date
   * variables to be set.
   */
  rangeChange() {
    if (this.range.controls.start.value != null) {
      this.firstDate = this.range.controls.start.value;
    }
    if (this.range.controls.end.value != null) {
      this.lastDate = this.range.controls.end.value;
    }
    if (this.range.controls.end.value != null && this.range.controls.start.value != null) {
      this.onRadioChange(this.viewType);
    }
  }


}
