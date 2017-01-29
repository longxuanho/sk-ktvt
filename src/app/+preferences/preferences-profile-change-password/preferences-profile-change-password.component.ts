import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'sk-preferences-profile-change-password',
  templateUrl: './preferences-profile-change-password.component.html',
  styleUrls: ['./preferences-profile-change-password.component.scss']
})
export class PreferencesProfileChangePasswordComponent implements OnInit {

  userChangePasswordForm: FormGroup;
  oldPassword: FormControl;
  newPassword: FormControl;
  repeatNewPassword: FormControl;
  
  submitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  buildForm() {
    this.oldPassword = this.formBuilder.control('', [Validators.required]);
    this.newPassword = this.formBuilder.control('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    this.repeatNewPassword = this.formBuilder.control('', [Validators.required, CustomValidators.equalTo(this.newPassword)]);
    this.userChangePasswordForm = this.formBuilder.group({ 
      oldPassword: this.oldPassword, 
      newPassword: this.newPassword, 
      repeatNewPassword: this.repeatNewPassword });
  }

  onSubmit() {
    this.submitting = true;
    this.submitting = false;
  }

  ngOnInit() {
  }

}
