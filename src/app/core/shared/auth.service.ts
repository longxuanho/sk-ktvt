import { Injectable, Inject } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserCredentials } from './auth.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private af: AngularFire) {}

  login(credentials: UserCredentials) {
    return Observable.fromPromise(
      <Promise<any>> this.af.auth.login(credentials)
    );
  }

  logout() {
    return Observable.fromPromise(this.af.auth.logout());
  }

  isAuthenticated() {
    return this.af.auth;
  }

}
