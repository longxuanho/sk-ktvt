import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Ng2PaginationModule } from 'ng2-pagination';

import { StatisticsRoutingModule, routedComponents } from './statistics-routing.module';

@NgModule({
  imports: [
    SharedModule,
    StatisticsRoutingModule,
    Ng2PaginationModule
  ],
  declarations: [
    routedComponents,
  ]
})
export class StatisticsModule { }
