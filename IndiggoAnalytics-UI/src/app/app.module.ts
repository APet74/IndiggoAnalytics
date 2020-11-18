import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule  } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {navComponent} from './views/navbar/nav.component';
import {analyticChartComponent} from './views/analytics-charts/analyticChart.component';
import {analyticsComponent} from './views/analytics/analytics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import { ChartModule } from 'angular2-chartjs';


@NgModule({
  declarations: [
    AppComponent,
    navComponent,
    analyticsComponent,
    analyticChartComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    ChartModule
  ],
  providers: [{
    provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
