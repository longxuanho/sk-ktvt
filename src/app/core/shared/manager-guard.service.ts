import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { AngularFire } from 'angularfire2';
import { Manager } from './auth.model';

declare var moment: any;

@Injectable()
export class ManagerGuard implements CanActivate {

  constructor(
    private router: Router,
    private af: AngularFire,
    private authService: AuthService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
    ) { }

  canActivate(): Observable<boolean> {
    return this.authService.getAuth()
      .switchMap(auth => {
        if (auth) {
          return this.af.database.object(`${this.appConfig['db.fbRefAuthManagers']}/${auth.uid}`)
            .map((managerObj: Manager) => {
              if (managerObj && managerObj.mPIN && managerObj.mToken) {
                let fromNow = moment()
                  .diff( moment(managerObj.mToken, this.appConfig['time.defaultDisplayFormat']), 'hours' );
                return (fromNow >= 0 && fromNow <= this.appConfig['time.mTokenValidHours'])
              }
              return false;
            });
        }
        return Observable.of(false);
      })
      .take(1)
      .do(result => {
        if (!result)
          this.router.navigate(['/xac-nhan-mpin']);
      });
  }
}