import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoggerService } from '../../core/shared/logger.service';
import { UserProfile } from '../shared/user.model';
import { AuthService } from '../../core/shared/auth.service';

@Component({
  selector: 'sk-preferences-profile-user-details',
  templateUrl: './preferences-profile-user-details.component.html',
  styleUrls: ['./preferences-profile-user-details.component.scss']
})
export class PreferencesProfileUserDetailsComponent implements OnInit {

  userProfileForm: FormGroup;
  displayName: FormControl;
  description: FormControl;

  submitting: boolean = false;
  userProfile: UserProfile;

  constructor(
    private formBuilder: FormBuilder,
    private loggerService: LoggerService,
    private router: Router,
    private authService: AuthService,
  ) { 
    this.buildForm();
  }

  buildForm() {
    this.displayName = this.formBuilder.control('', Validators.required);
    this.description = this.formBuilder.control('', Validators.required);
    this.userProfileForm = this.formBuilder.group({
      displayName: this.displayName,
      description: this.description 
    });
  }

  resetForm() {
    this.userProfileForm.reset();
  }

  onSubmit(profile: UserProfile) {
    this.submitting = true;
    this.authService
      .setUserProfile(profile)
      .finally(() => this.submitting = false)
      .subscribe(
        success => this.loggerService.success('Hồ sơ của bạn đã được cập nhật vào hệ thống.', 'Cập nhật thành công!'),
        error => this.loggerService.error(error.message, 'Opps!', error));
  }

  ngOnInit() {
    this.authService.getAuth()
      .switchMap(auth => {
        return this.authService.getUserProfile(auth.uid);
      })
      .subscribe(profile => this.userProfileForm.patchValue(profile));
  }

}
