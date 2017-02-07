import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThietbisSearchComponent } from './thietbis-search/thietbis-search.component';
import { ThietbisListResultItemComponent } from './thietbis-list-result-item/thietbis-list-result-item.component';
import { ThietbisListResultInfoComponent } from './thietbis-list-result-info/thietbis-list-result-info.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ThietbisSearchComponent,
    ThietbisListResultItemComponent,
    ThietbisListResultInfoComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThietbisSearchComponent,
    ThietbisListResultItemComponent,
    ThietbisListResultInfoComponent
  ]
})
export class SharedModule { }
