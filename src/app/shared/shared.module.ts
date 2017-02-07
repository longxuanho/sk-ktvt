import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThietbisSearchComponent } from './thietbis-search/thietbis-search.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ThietbisSearchComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThietbisSearchComponent
  ]
})
export class SharedModule { }
