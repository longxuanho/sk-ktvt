import { Injectable, Inject } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserCredentials } from './auth.model';
import { LoggerService } from '../shared/logger.service';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Injectable()
export class AuthService {

  constructor(
    private af: AngularFire,
    private loggerService: LoggerService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) { }

  login(credentials: UserCredentials) {
    return Observable.fromPromise(
      <Promise<any>>this.af.auth.login(credentials)
    );
  }

  logout() {
    return Observable.fromPromise(this.af.auth.logout());
  }

  getAuth() {
    return this.af.auth;
  }

  isAuthenticated() {
    return this.af.auth;
  }

  getUserProfile(uid: string, email?: string): Observable<any> {
    let userProfile = {};
    if (uid)
      userProfile = email ? { uid, email } : { uid };

    return this.af.database.object(`${this.appConfig['db.firebaseApi']['userProfiles']}/${uid}`, { preserveSnapshot: true })
      .take(1)
      .map( profileSnap => (profileSnap.val()) ? Object.assign(profileSnap.val(), userProfile) : userProfile );
  }

  setUserPresence(user: firebase.User) {
    this.getUserProfile(user.uid, user.email)
      .subscribe(
        profile => {
          this.af.database.object(`${this.appConfig['db.firebaseApi']['userPresence']}/${user.uid}`)
          .set(profile);
        },
        error => this.loggerService.error(error.message, 'Opps!', error)
      );
  }

}
