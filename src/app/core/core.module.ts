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
import { CORE_CONFIG, coreConfig } from './core.config';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(coreConfig['db.firebase'], coreConfig['db.firebaseAuth'], coreConfig['db.firebaseApp']),
    ToastrModule.forRoot(),
  ],
  declarations: [
    NavbarComponent,
    LoginComponent,
    LogoutComponent
  ],
  providers: [
    { provide: CORE_CONFIG, useValue: coreConfig },
    LoggerService,
    AuthService
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
