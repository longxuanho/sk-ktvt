import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRoutingModule, routedComponents } from './input-routing.module';

@NgModule({
  imports: [
    CommonModule,
    InputRoutingModule
  ],
  declarations: [
    routedComponents,
  ]
})
export class InputModule { }
