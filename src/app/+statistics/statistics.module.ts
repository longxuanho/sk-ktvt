import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { StatisticsRoutingModule, routedComponents } from './statistics-routing.module';
import { StatisticsNavComponent } from './statistics-nav/statistics-nav.component';
import { StatisticsTongQuanComponent } from './statistics-tong-quan/statistics-tong-quan.component';
import { StatisticsDanhSachComponent } from './statistics-danh-sach/statistics-danh-sach.component';
import { StatisticsTrichXuatComponent } from './statistics-trich-xuat/statistics-trich-xuat.component';
import { StatisticsSearchComponent } from './statistics-search/statistics-search.component';

@NgModule({
  imports: [
    SharedModule,
    StatisticsRoutingModule
  ],
  declarations: [
    routedComponents,
    StatisticsNavComponent,
    StatisticsTongQuanComponent,
    StatisticsDanhSachComponent,
    StatisticsTrichXuatComponent,
    StatisticsSearchComponent,
  ]
})
export class StatisticsModule { }
