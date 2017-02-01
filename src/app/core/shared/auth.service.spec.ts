/* tslint:disable:no-unused-variable */

import { AuthService } from './auth.service';
import { UserCredentials } from './auth.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

describe('AuthService', () => {
  let authService: AuthService,
    mockAngularFire, mockLoggerService, mockAppConfig;

  beforeEach(() => {
    mockAngularFire = {
      auth: jasmine.createSpyObj('mockAngularFire.auth', ['login', 'logout']),
      database: jasmine.createSpyObj('mockAngularFire.database', ['object'])
    }
    mockAppConfig = {
      'db.fbRefUserPresence': 'userPresenceRef',
      'db.fbRefUserProfiles': 'userProfilesRef',
      'db.fbRefAuthManagers': 'userManagersRef'
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

  describe('isManager', () => {

    it('should return Observable<false> if user is not logged in', () => {
      mockAngularFire.auth = Observable.of(null);
      
      let result;
      authService.isManager()
        .subscribe(data => result = data);
      expect(result).toBeFalsy();
    });

    it('should query from server once for each request an then complete', () => {
      mockAngularFire.auth = Observable.of({ uid: 'userUid' });
      mockAngularFire.database.object.and.returnValue(Observable.of(true));
      let take = spyOn(Observable.prototype, 'take');
      take.and.returnValue(Observable.of({ }));

      authService.isManager()
        .subscribe();
      expect(mockAngularFire.auth.take).toHaveBeenCalledWith(1);
      expect(take).toHaveBeenCalledTimes(2);
    })

    it('should retrieve firebase\'s manager object from correct url', () => {
      mockAngularFire.auth = Observable.of({ uid: 'userUid' });
      mockAngularFire.database.object.and.returnValue(Observable.of(true));      
      
      authService.isManager()
        .subscribe();
      expect(mockAngularFire.database.object).toHaveBeenCalledWith('userManagersRef/userUid');
    });

    it('should return Observable<false> if user is not a manager or he has an invalid mPIN', () => {
      mockAngularFire.auth = Observable.of({ uid: 'userUid' });
      mockAngularFire.database.object.and.returnValue(Observable.of({  }));
      
      let result;
      authService.isManager()
        .subscribe(data => result = data);
      expect(result).toBeFalsy();
    });

    it('should return Observable<true> if user is a manager that has a valid mPIN', () => {
      mockAngularFire.auth = Observable.of({ uid: 'userUid' });
      mockAngularFire.database.object.and.returnValue(Observable.of({ mPIN: 1234 }));
      
      let result;
      authService.isManager()
        .subscribe(data => result = data);
      expect(result).toBeTruthy();
    });

  });

  describe('isManagerPINMatched', () => {

    it('should throw Error if user mPIN param not exist', () => {
      authService.isManagerPINMatched(null)
        .subscribe(
        () => fail('Error expected to be thrown here'),
        (error) => expect(error.message).toBe('Mã PIN người dùng không hợp lệ')
      );
    })

    it('should return Observable<false> if user is not logged in', () => {
      mockAngularFire.auth = Observable.of(null);
      
      let result;
      authService.isManagerPINMatched(1234)
        .subscribe(data => result = data);
      expect(result).toBeFalsy();
    });

    it('should query from server once for each request an then complete', () => {
      mockAngularFire.auth = Observable.of({ uid: 'userUid' });
      mockAngularFire.database.object.and.returnValue(Observable.of(true));
      let take = spyOn(Observable.prototype, 'take');
      take.and.returnValue(Observable.of({ }));

      authService.isManagerPINMatched(1234)
        .subscribe();
      expect(mockAngularFire.auth.take).toHaveBeenCalledWith(1);
      expect(take).toHaveBeenCalledTimes(2);
    })

    it('should return Observable<false> if mPIN is not matched', () => {
      mockAngularFire.auth = Observable.of({ uid: 'userUid' });
      mockAngularFire.database.object.and.returnValue(Observable.of({ mPIN: 1234 }));

      let result;
      authService.isManagerPINMatched(2345)
        .subscribe(data => result = data);
      expect(result).toBeFalsy();
    })

    it('should return Observable<true> if mPIN is matched', () => {
      mockAngularFire.auth = Observable.of({ uid: 'userUid' });
      mockAngularFire.database.object.and.returnValue(Observable.of({ mPIN: 1234 }));

      let result;
      authService.isManagerPINMatched(1234)
        .subscribe(data => result = data);
      expect(result).toBeTruthy();
    })
    
    it('should try to convert mPIN param to number if it is string', () => {
      mockAngularFire.auth = Observable.of({ uid: 'userUid' });
      mockAngularFire.database.object.and.returnValue(Observable.of({ mPIN: 1234 }));

      let result;
      authService.isManagerPINMatched(<any>'1234')
        .subscribe(data => result = data);
      expect(result).toBeTruthy();
    })    

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
