import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoggerService } from '../shared/logger.service';
import { AuthService } from '../shared/auth.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sk-mpin-verification',
  templateUrl: './mpin-verification.component.html',
  styleUrls: ['./mpin-verification.component.scss']
})
export class MpinVerificationComponent implements OnInit {

  mPINValidateForm: FormGroup;
  mPIN: FormControl;
  validHours: number;

  constructor(
    private router: Router,
    private locationService: Location,
    private formBuilder: FormBuilder,
    private loggerService: LoggerService,
    private authService: AuthService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {
    this.validHours = this.appConfig['time.mTokenValidHours'];
    this.buildForm();
  }

  goBack() {
    this.locationService.back();
  }

  buildForm() {
    this.mPIN = new FormControl('', Validators.required);
    this.mPINValidateForm = this.formBuilder.group({
      mPIN: this.mPIN
    });
  }

  onSubmit(rawData) {
    this.authService
      .isManagerPINMatched(rawData.mPIN)
      .switchMap(
        isMatched => isMatched ? this.authService.refreshManagerToken() : Observable.of(false))
      .subscribe(
        isDone => {
          if (isDone) {
            this.router.navigate(['/nhap-lieu/thiet-bi']);
            this.loggerService.success('Hệ thống tự động chuyển tới trang bạn đã yêu cầu trước đó.', 'Xác nhận thành công!');
          } else
            this.loggerService.error('Mã xác nhận không khớp. Xin vui lòng thử lại sau.', 'Xác nhận thất bại!');
        },
        error => this.loggerService.error(error.message, 'Opps!', error));
  }

  ngOnInit() {
    
  }

}
