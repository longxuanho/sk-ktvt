import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoggerService } from '../shared/logger.service';
import { AuthService } from '../shared/auth.service';
import { UserCredentials } from '../shared/auth.model';
import { Router } from '@angular/router';
import { APP_CONST, AppConstants } from '../../app.constants';

@Component({
  selector: 'sk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loggerService: LoggerService,
    private router: Router,
    @Inject(APP_CONST) private appConstant: AppConstants
  ) {
    this.buildForm();
  }

  buildForm() {
    this.email = new FormControl('',
      Validators.required
    // [
    //   Validators.required,
    //   Validators.pattern(new RegExp(this.appConstant['validator.emailPattern'], 'gi'))
    // ]
    );
    this.password = new FormControl('', Validators.required)
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  onLogIn(credentials: UserCredentials) {
    this.authService.login(credentials)
      .subscribe(
        (success) => {
          this.loggerService.success('Welcome back!', 'Đăng nhập thành công', success);
          setTimeout(() => {
            this.router.navigate(['/thong-ke']);
          }, 1000);
        },
        (error) => this.loggerService.error(error.message, 'Opps!', error)
      )
  }

  ngOnInit() { }

}

