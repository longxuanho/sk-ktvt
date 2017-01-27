import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { StatisticsRoutingModule, routedComponents } from './statistics-routing.module';

@NgModule({
  imports: [
    SharedModule,
    StatisticsRoutingModule
  ],
  declarations: [
    routedComponents
  ]
})
export class StatisticsModule { }
