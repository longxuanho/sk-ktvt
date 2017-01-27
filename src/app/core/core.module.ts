import './rxjs-extensions';

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'toastr-ng2';

import { LoggerService } from './logger.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    NavbarComponent
  ],
  providers: [
    LoggerService,
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');    
  }
}
