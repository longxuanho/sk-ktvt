import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InputRoutingModule, routedComponents } from './input-routing.module';
import { ThietbisHelpersService } from './shared/thietbis-helpers.service';
import { ThietbisService } from './shared/thietbis.service';
import { ThietbisImportService } from './shared/thietbis-import.service';

@NgModule({
  imports: [
    SharedModule,
    InputRoutingModule
  ],
  declarations: [
    routedComponents,
  ],
  providers: [
    ThietbisService,
    ThietbisHelpersService,
    ThietbisImportService
  ]
})
export class InputModule { }
