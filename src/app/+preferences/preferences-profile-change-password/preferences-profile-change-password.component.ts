import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../../core/shared/auth.service';
import { LoggerService } from '../../core/shared/logger.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import * as firebase from 'firebase';


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
  firebaseInstance;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loggerService: LoggerService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
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

  onSubmit(event: Event, credentials: { oldPassword: string, newPassword: string }) {
    event.preventDefault();
    this.submitting = true;
    
    this.authService.getAuth()
      .take(1)
      .subscribe(auth => {
        if (auth) {
          const credential = firebase.auth.EmailAuthProvider.credential(auth.auth.email, credentials.oldPassword);
          console.log('credential: ', credential, firebase.auth());
          firebase.auth().signInWithEmailAndPassword(auth.auth.email, credentials.oldPassword)
            .then((success) => {
              firebase.auth().currentUser.updatePassword(credentials.newPassword)
                .then(success => {
                  this.submitting = false;        
                  this.loggerService.success('Mật khẩu của bạn đã được thay đổi thành công', 'Cập nhật thành công');
                });
            })
            .catch((error: Error) => {
              this.submitting = false;
              this.loggerService.error(error.message, 'Opps!', error);
            });
          }
        });
  }

  ngOnInit() {
    firebase.initializeApp(this.appConfig['db.firebase']);
  }

}
