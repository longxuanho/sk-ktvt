import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app.config';

@Injectable()
export class AuthService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig) {
    
  }

}
