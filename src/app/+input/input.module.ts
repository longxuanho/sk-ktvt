import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InputRoutingModule, routedComponents } from './input-routing.module';
import { ThietbisHelpersService } from './shared/thietbis-helpers.service';

@NgModule({
  imports: [
    SharedModule,
    InputRoutingModule
  ],
  declarations: [
    routedComponents,
  ],
  providers: [
    ThietbisHelpersService
  ]
})
export class InputModule { }
