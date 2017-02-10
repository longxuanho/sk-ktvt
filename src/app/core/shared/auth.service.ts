import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { UserCredentials, Manager } from './auth.model';
import { LoggerService } from '../shared/logger.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { APP_CONFIG, AppConfig } from '../../app.config';

declare var moment: any;

@Injectable()
export class AuthService {

  private authSource = new Subject<FirebaseAuthState>();
  private managerSource = new Subject<Manager>();
  auth$: Observable<FirebaseAuthState>;
  manager$: Observable<Manager>

  constructor(
    private af: AngularFire,
    private loggerService: LoggerService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) { 
    this.auth$ = this.authSource.asObservable();
    this.manager$ = this.managerSource.asObservable();
  }

  authSet(auth: FirebaseAuthState) {
    this.authSource.next(auth);
  }

  managerSet(auth: FirebaseAuthState) {
    if (!auth)
      this.managerSource.next(null);
    else {
      this.af.database
        .object(`${this.appConfig['db.fbRefAuthManagers']}/${auth.uid}`, { preserveSnapshot: true })
        .subscribe(
          managerSnap => this.managerSource.next(managerSnap.val()),
          error => this.managerSource.next(null));
    }
  }

  login(credentials: UserCredentials) {
    return Observable.fromPromise(
      <Promise<any>>this.af.auth.login(credentials)
    );
  }

  logout() {
    return this.af.auth
      .switchMap(auth => {
        if (!auth)
          return Observable.of(false);
        return this.af.database.object(`${this.appConfig['db.fbRefUserPresence']}/${auth.uid}`)
          .remove()
          .then(success => Observable.of(true))
          .catch(error => Observable.throw(new Error(error.message)));
      })
      .do(() => {
        this.af.auth.logout();
      })
      .take(1);
  }

  setUserProfile(userProfile) {
    return this.af.auth
      .take(1)
      .switchMap(auth => {
        if (!auth)
          return Observable.of(false);
        return this.af.database.object(`${this.appConfig['db.fbRefUserProfiles']}/${auth.uid}`)
          .set(userProfile)
          .then(success => Observable.of(true))
          .catch(error => Observable.throw(new Error(error.message)));
      });
  }

  getAuth() {
    return this.af.auth;
  }

  isAuthenticated() {
    return this.af.auth;
  }

  isManagerPINMatched(mPIN: number) {
    if (!mPIN)
      return Observable.throw(new Error('Mã PIN người dùng không hợp lệ'));

    return this.af.auth
      .switchMap(auth => {
        if (!auth)
          return Observable.of(false);
        return this.af.database.object(`${this.appConfig['db.fbRefAuthManagers']}/${auth.uid}`)
          .map((managerObj: Manager) => managerObj.mPIN === +mPIN);
      })
      .take(1);
  }

  refreshManagerToken() {
    return this.af.auth
      .switchMap(auth => {
        if (!auth)
          return Observable.of(false);
        return this.af.database.object(`${this.appConfig['db.fbRefAuthManagers']}/${auth.uid}`)
          .update({ mToken: moment().format(this.appConfig['time.defaultDisplayFormat']) })
          .then(success => Observable.of(true))
          .catch(error => Observable.throw(new Error(error.message)));
      })
      .take(1);
  }

  getUserProfile(uid: string, email?: string): Observable<any> {
    let userProfile = {};
    if (uid)
      userProfile = email ? { uid, email } : { uid };

    return this.af.database.object(`${this.appConfig['db.fbRefUserProfiles']}/${uid}`, { preserveSnapshot: true })
      .take(1)
      .map( profileSnap => (profileSnap.val()) ? Object.assign(profileSnap.val(), userProfile) : userProfile );
  }

  setUserPresence(user: firebase.User) {
    this.getUserProfile(user.uid, user.email)
      .subscribe(
        profile => {
          this.af.database.object(`${this.appConfig['db.fbRefUserPresence']}/${user.uid}`)
          .set(profile);
        },
        error => this.loggerService.error(error.message, 'Opps!', error)
      );
  }

}
