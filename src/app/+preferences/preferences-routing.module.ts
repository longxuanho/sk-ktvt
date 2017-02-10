import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreferencesComponent } from './preferences.component';
import { PreferencesProfileComponent } from './preferences-profile/preferences-profile.component';
import { PreferencesProfileChangePasswordComponent } from './preferences-profile-change-password/preferences-profile-change-password.component';
import { PreferencesProfileUserDetailsComponent } from './preferences-profile-user-details/preferences-profile-user-details.component';

const routes: Routes = [
  {
    path: '',
    component: PreferencesComponent,
    children: [
      { path: '', redirectTo: 'ho-so-ca-nhan', pathMatch: 'full' },
      { path: 'ho-so-ca-nhan', component: PreferencesProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PreferencesRoutingModule { }

export const routedComponents = [
  PreferencesComponent,
  PreferencesProfileComponent,
  PreferencesProfileChangePasswordComponent,
  PreferencesProfileUserDetailsComponent,
]
