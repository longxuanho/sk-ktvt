import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsComponent } from './statistics.component';
import { StatisticsTongQuanComponent } from './statistics-tong-quan/statistics-tong-quan.component';
import { StatisticsDanhSachComponent } from './statistics-danh-sach/statistics-danh-sach.component';
import { StatisticsDanhSachNavComponent } from './statistics-danh-sach-nav/statistics-danh-sach-nav.component';
import { StatisticsThietbisDetailsComponent } from './statistics-thietbis-details/statistics-thietbis-details.component';


const routes: Routes = [
  { 
    path: '', 
    component: StatisticsComponent,
    children: [
      { path: '', redirectTo: 'danh-sach', pathMatch: 'full' },
      { path: 'tong-quan', component: StatisticsTongQuanComponent },
      { path: 'danh-sach', component: StatisticsDanhSachComponent },
      { path: 'danh-sach/:id', component: StatisticsThietbisDetailsComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StatisticsRoutingModule { }

export const routedComponents = [
  StatisticsComponent,
  StatisticsTongQuanComponent,
  StatisticsDanhSachComponent,
  StatisticsDanhSachNavComponent,
  StatisticsThietbisDetailsComponent
]