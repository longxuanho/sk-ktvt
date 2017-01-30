import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InputRoutingModule, routedComponents } from './input-routing.module';

@NgModule({
  imports: [
    SharedModule,
    InputRoutingModule
  ],
  declarations: [
    routedComponents,
  ]
})
export class InputModule { }
