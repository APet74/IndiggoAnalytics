import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Analytic } from '../models/Analytic.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {
  constructor(private http: HttpClient) { }

  /**
   * Takes a start and end date, metric type (user, new users, session or pageviews) and if we want organic or not (can handle the case
   * where we want both regular and organic.) This calls our backend to return the data.
   * @param date1
   * @param date2
   * @param type
   * @param organic
   */
  public  getAnalytics( date1, date2, type, organic): Observable<Analytic[]> {
    return this.http.get<Analytic[]>(environment.baseUrl + 'analytics/' + date1 + '/' + date2 + '/' + type + '/' + organic);
  }
}
