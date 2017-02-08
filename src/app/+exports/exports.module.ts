import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ExportsRoutingModule, routedComponents } from './exports-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ExportsRoutingModule
  ],
  declarations: [
    routedComponents,
  ]
})
export class ExportsModule { }
