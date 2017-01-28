import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule, routedComponents } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { APP_CONST, appConst } from './app.constants';
import { APP_CONFIG, appConfig } from './app.config';


@NgModule({  
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,    
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    routedComponents
  ],
  providers: [
    { provide: APP_CONST, useValue: appConst },
    { provide: APP_CONFIG, useValue: appConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
