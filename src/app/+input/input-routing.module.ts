import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputComponent } from './input.component';

const routes: Routes = [
  { path: '', component: InputComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class InputRoutingModule { }

export const routedComponents = [
  InputComponent
]