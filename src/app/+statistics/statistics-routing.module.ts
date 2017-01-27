import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics.component';

const routes: Routes = [
  { path: '', component: StatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StatisticsRoutingModule { }

export const routedComponents = [
  StatisticsComponent
]