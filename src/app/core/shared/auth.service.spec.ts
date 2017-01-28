/* tslint:disable:no-unused-variable */

import { AuthService } from './auth.service';
import { UserCredentials } from './auth.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

describe('AuthService', () => {
  let authService: AuthService,
    mockAngularFire, mockLoggerService, mockAppConfig;

  beforeEach(() => {
    mockAngularFire = {
      auth: jasmine.createSpyObj('mockAngularFire.auth', ['login', 'logout']),
      database: jasmine.createSpyObj('mockAngularFire.database', ['object'])
    }
    mockAppConfig = {
      'db.firebaseApi': {
        'userPresence': 'userPresenceRef',
        'userProfiles': 'userProfilesRef'
      }
    }
    
    authService = new AuthService(mockAngularFire, mockLoggerService, mockAppConfig);
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

  describe('getUserProfile', () => {

    it('should retrieve firebase\'s userProfile from correct url', () => {
      mockAngularFire.database.object.and.returnValue(Observable.of({ userName: 'userName' }));   
      
      authService.getUserProfile('userUid', 'userEmail');
      expect(mockAngularFire.database.object).toHaveBeenCalledWith('userProfilesRef/userUid', { preserveSnapshot: true })
    });

    it('should return Observable<{ uid }> if input params has { uid } only and firebase\' userProfile not found', () => {
      mockAngularFire.database.object.and.returnValue(Observable.of({ val: () => null }));

      let userProfile;
      authService.getUserProfile('userUid')
        .subscribe((result) => {
          userProfile = result
        });
      expect(userProfile).toEqual({ uid: 'userUid' });
    });

    it('should return Observable<{ uid, email }> if input params has both { uid, email } and firebase\' userProfile not found', () => {
      mockAngularFire.database.object.and.returnValue(Observable.of({ val: () => null }));

      let userProfile;
      authService.getUserProfile('userUid', 'userEmail')
        .subscribe((result) => {
          userProfile = result
        });
      expect(userProfile).toEqual({ uid: 'userUid', email: 'userEmail' });
    });

    it('should return Observable<{ uid, email, userName }> if found firebase\' userProfile with { userName }', () => {
      mockAngularFire.database.object.and.returnValue(Observable.of({ val: () => { return {userName: 'userName'}; } }));

      let userProfile;
      authService.getUserProfile('userUid', 'userEmail')
        .subscribe((result) => {
          userProfile = result
        });
      expect(userProfile).toEqual({ uid: 'userUid', userName: 'userName', email: 'userEmail' });
    });

    it('should overide { uid, email } fields in firebase\' userProfile with current user { uid, email }', () => {
      mockAngularFire.database.object.and.returnValue(
        Observable.of(
          { val: () => { return { userName: 'userName', uid: 'userUidToOveride', email: 'userEmailToOveridde' }; } }
        ));

      let userProfile;
      authService.getUserProfile('userUid', 'userEmail')
        .subscribe((result) => {
          userProfile = result
        });
      expect(userProfile).toEqual({ uid: 'userUid', userName: 'userName', email: 'userEmail' });
    });

  });

  describe('userPresence', () => {
    let getUserProfile, set;

    beforeEach(() => {
      getUserProfile = jasmine.createSpy('getUserProfile');
      getUserProfile.and.returnValue(Observable.of({ uid: 'userUid' }));
      
      set = jasmine.createSpy('mockAngularFire.database.object.set');
      mockAngularFire.database.object.and.returnValue({ set });    
    });

    it('should call this.getUserProfile() with correct params to retrieve current user profile', () => {      
      authService.getUserProfile = getUserProfile;

      authService.setUserPresence(<firebase.User>{ uid: 'userUid', email: 'userEmail'});
      expect(authService.getUserProfile).toHaveBeenCalledWith('userUid', 'userEmail');
    });

    it('should set firebase\'s userPresence with profile return from this.getUserProfile()', () => {
      authService.getUserProfile = getUserProfile;

      authService.setUserPresence(<firebase.User>{ uid: 'userUid', email: 'userEmail'});
      expect(mockAngularFire.database.object).toHaveBeenCalledWith('userPresenceRef/userUid');
      expect(set).toHaveBeenCalledWith({ uid: 'userUid' })
    });

  })

});
