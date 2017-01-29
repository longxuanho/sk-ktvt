import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoggerService } from '../../core/shared/logger.service';
import { UserProfile } from '../shared/user.model';

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
    private loggerService: LoggerService
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
    this.submitting = false;
  }

  ngOnInit() {
  }

}
