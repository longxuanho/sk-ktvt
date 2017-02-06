import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Ng2PaginationModule } from 'ng2-pagination';
import { InputRoutingModule, routedComponents } from './input-routing.module';
import { ThietbisHelpersService } from './shared/thietbis-helpers.service';
import { ThietbisService } from './shared/thietbis.service';
import { ThietbisImportService } from './shared/thietbis-import.service';

@NgModule({
  imports: [
    SharedModule,
    Ng2PaginationModule,
    InputRoutingModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    ThietbisService,
    ThietbisHelpersService,
    ThietbisImportService,
  ]
})
export class InputModule { }
