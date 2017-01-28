import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './core/shared/auth-guard.service';
import { LoginGuard } from './core/login/login-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bang-tin', canActivate: [AuthGuard] },
  { path: 'dang-nhap', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'bang-tin', loadChildren: 'app/+dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
  { path: 'thong-ke', loadChildren: 'app/+statistics/statistics.module#StatisticsModule', canActivate: [AuthGuard] },
  { path: 'nhap-lieu', loadChildren: 'app/+input/input.module#InputModule', canActivate: [AuthGuard] },
  { path: 'thiet-lap', loadChildren: 'app/+preferences/preferences.module#PreferencesModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    LoginGuard
  ]
})
export class AppRoutingModule { }

export const routedComponents = [
  AboutComponent
]
