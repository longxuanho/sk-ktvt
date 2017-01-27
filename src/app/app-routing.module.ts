import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bang-tin' },
  { path: 'thong-ke', loadChildren: 'app/+statistics/statistics.module#StatisticsModule' },
  { path: 'nhap-lieu', loadChildren: 'app/+input/input.module#InputModule' },
  { path: 'thiet-lap', loadChildren: 'app/+preferences/preferences.module#PreferencesModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

export const routedComponents = []
