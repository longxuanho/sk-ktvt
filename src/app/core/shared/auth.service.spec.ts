/* tslint:disable:no-unused-variable */

import { AuthService } from './auth.service';
import { UserCredentials } from './auth.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

describe('AuthService', () => {
  let authService: AuthService,
      mockAngularFire: any;

  beforeEach(() => {
    mockAngularFire = {
      auth: jasmine.createSpyObj('mockAngularFire', ['login', 'logout'])
    }
    authService = new AuthService(mockAngularFire);
  });

  describe('login', () => {

    it('should call login method from AngularFire Service with credentials', () => {
      let credential: UserCredentials = {
        email: 'Long Ho',
        password: '12345'
      }
      mockAngularFire.auth.login.and.returnValue(Promise.resolve(true));

      authService.login(credential);
      expect(mockAngularFire.auth.login).toHaveBeenCalledWith({
        email: 'Long Ho',
        password: '12345'
      });
    });

  });

  describe('logout', () => {

    it('should call logout method from AngularFire Service', () => {
      mockAngularFire.auth.login.and.returnValue(Promise.resolve(true));

      authService.logout();
      expect(mockAngularFire.auth.logout).toHaveBeenCalled();
    });

  });

  describe('getAuth', () => {

    it('should return observable AngularFire Auth object', () => {
      let auth = authService.getAuth();
      expect(auth).toBe(mockAngularFire.auth);
    });

  });

  describe('isAuthenticated', () => {

    it('should return observable AngularFire Auth object', () => {
      let auth = authService.isAuthenticated();
      expect(auth).toBe(mockAngularFire.auth);
    });

  });

});
