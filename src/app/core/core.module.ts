import './rxjs-extensions';

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'toastr-ng2';
import { AngularFireModule } from 'angularfire2';

import { LoggerService } from './shared/logger.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from './shared/auth.service';
import { ThietbisService } from './shared/thietbis.service';
import { appConfig } from '../app.config';
import { MpinVerificationComponent } from './mpin-verification/mpin-verification.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(appConfig['db.firebase'], appConfig['db.fbAuth'], appConfig['db.fbApp']),
    ToastrModule.forRoot(),
  ],
  declarations: [
    NavbarComponent,
    LoginComponent,
    LogoutComponent,
    MpinVerificationComponent
  ],
  providers: [
    LoggerService,
    AuthService,
    ThietbisService
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
