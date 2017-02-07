import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Ng2PaginationModule } from 'ng2-pagination';

import { StatisticsRoutingModule, routedComponents } from './statistics-routing.module';
import { StatisticsDanhSachNavComponent } from './statistics-danh-sach-nav/statistics-danh-sach-nav.component';

@NgModule({
  imports: [
    SharedModule,
    StatisticsRoutingModule,
    Ng2PaginationModule
  ],
  declarations: [
    routedComponents,
    StatisticsDanhSachNavComponent,
  ]
})
export class StatisticsModule { }
