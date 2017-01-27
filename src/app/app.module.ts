import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { AppComponent } from './app.component';

@NgModule({  
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,    
    DashboardModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
