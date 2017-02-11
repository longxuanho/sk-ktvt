import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './core/shared/auth-guard.service';
import { ManagerGuard } from './core/shared/manager-guard.service';
import { LoginGuard } from './core/login/login-guard.service';
import { MpinVerificationComponent } from './core/mpin-verification/mpin-verification.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'thong-ke', canActivate: [AuthGuard] },
  { path: 'dang-nhap', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'xac-nhan-mpin', component: MpinVerificationComponent, canActivate: [AuthGuard] },
  { path: 'bang-tin', loadChildren: 'app/+dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
  { path: 'thong-ke', loadChildren: 'app/+statistics/statistics.module#StatisticsModule', canActivate: [AuthGuard] },
  { path: 'nhap-lieu', loadChildren: 'app/+input/input.module#InputModule', canActivate: [ManagerGuard] },
  { path: 'thiet-lap', loadChildren: 'app/+preferences/preferences.module#PreferencesModule', canActivate: [AuthGuard] },
  { path: 'trich-xuat', loadChildren: 'app/+exports/exports.module#ExportsModule', canActivate: [ManagerGuard] },
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
    ManagerGuard,
    LoginGuard
  ]
})
export class AppRoutingModule { }

export const routedComponents = [
  AboutComponent
]
