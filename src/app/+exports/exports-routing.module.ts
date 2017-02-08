import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportsComponent } from './exports.component';
import { ExportsThietbisComponent } from './exports-thietbis/exports-thietbis.component';
import { ExportsThietbisInfoComponent } from './exports-thietbis-info/exports-thietbis-info.component';
import { ExportsThietbisGridComponent } from './exports-thietbis-grid/exports-thietbis-grid.component';

const routes: Routes = [
  { 
    path: '', 
    component: ExportsComponent,
    children: [
      { path: 'thiet-bi', component: ExportsThietbisComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ExportsRoutingModule { }

export const routedComponents = [
  ExportsComponent,
  ExportsThietbisComponent,
  ExportsThietbisInfoComponent,
  ExportsThietbisGridComponent,
]
