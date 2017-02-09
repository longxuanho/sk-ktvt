import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Ng2PaginationModule } from 'ng2-pagination';

import { StatisticsRoutingModule, routedComponents } from './statistics-routing.module';
import { StatisticsTreeViewComponent } from './statistics-tree-view/statistics-tree-view.component';
import { ThietbisTreeViewService } from './shared/thietbis-tree-view.service';
import { StatisticsThietbisGridComponent } from './statistics-thietbis-grid/statistics-thietbis-grid.component';
import { StatisticsTongQuanToggleBtnComponent } from './statistics-tong-quan-toggle-btn/statistics-tong-quan-toggle-btn.component';

@NgModule({
  imports: [
    SharedModule,
    StatisticsRoutingModule,
    Ng2PaginationModule
  ],
  declarations: [
    routedComponents,
    StatisticsTreeViewComponent,
    StatisticsThietbisGridComponent,
    StatisticsTongQuanToggleBtnComponent,
  ],
  providers: [
    ThietbisTreeViewService
  ]
})
export class StatisticsModule { }
