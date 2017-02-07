import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsComponent } from './statistics.component';
import { StatisticsNavComponent } from './statistics-nav/statistics-nav.component';
import { StatisticsTongQuanComponent } from './statistics-tong-quan/statistics-tong-quan.component';
import { StatisticsDanhSachComponent } from './statistics-danh-sach/statistics-danh-sach.component';
import { StatisticsTrichXuatComponent } from './statistics-trich-xuat/statistics-trich-xuat.component';

const routes: Routes = [
  { 
    path: '', 
    component: StatisticsComponent,
    children: [
      { path: 'tong-quan', component: StatisticsTongQuanComponent },
      { path: 'danh-sach', component: StatisticsDanhSachComponent },
      { path: 'trich-xuat', component: StatisticsTrichXuatComponent }
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
  StatisticsNavComponent,
  StatisticsTongQuanComponent,
  StatisticsDanhSachComponent,
  StatisticsTrichXuatComponent,
]