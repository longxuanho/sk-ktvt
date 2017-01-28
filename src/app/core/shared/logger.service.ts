import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig, LogMode } from '../../app.config'
import { ToastrService } from 'toastr-ng2';


@Injectable()
export class LoggerService {

  logMode: number;

  constructor(
    private toastrService: ToastrService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {
    this.logMode = appConfig['logger.mode'];
  }

  success(message: string, title?: string, data?) {
    title = title ? title : 'Thành công';
    this.toastrService.success(message, title);

    if (this.logMode !== LogMode.Disabled) {
      if (this.logMode === LogMode.Debug) {
        console.info(`${title}: ${message}`);
        if (data)
          console.info('data: ', data);
      }
    }
  }

  info(message: string, title?: string, data?) {
    title = title ? title : 'Thông tin';
    this.toastrService.info(message, title);

    if (this.logMode !== LogMode.Disabled) {
      if (this.logMode === LogMode.Debug) {
        console.info(`${title}: ${message}`);
        if (data)
          console.info('data: ', data);
      }
    }
  }

  error(message: string, title?: string, data?) {
    title = title ? title : 'Lỗi';
    this.toastrService.error(message, title);

    if (this.logMode !== LogMode.Disabled) {
      console.error(`${title}: ${message}`);
      if (data)
        console.error('data: ', data);
    }
  }

  warning(message: string, title?: string, data?) {
    title = title ? title : 'Cảnh báo';
    this.toastrService.warning(message, title);

    if (this.logMode !== LogMode.Disabled) {
      console.warn(`${title}: ${message}`);
      if (data)
        console.warn('data: ', data);
    }
  }

}
