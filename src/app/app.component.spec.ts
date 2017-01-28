/* tslint:disable:no-unused-variable */

import { AppComponent } from './app.component';
import { AuthService } from './core/shared/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

describe('App Component', () => {

  let appComponent: AppComponent,
      mockAuthService, mockLoggerService;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('mockAuthService', ['getAuth', 'setUserPresence']);
    mockLoggerService = jasmine.createSpyObj('mockLoggerService', ['error']);

    appComponent = new AppComponent(mockAuthService, mockLoggerService);
  });

  describe('ngOnInit', () => {

    beforeEach(() => {
      mockAuthService.getAuth.and.returnValue(Observable.of({ 
        auth: { uid: 'uid' }
      }));
    });
    
    it('should call to AuthService\'s getAuth() method', () => {
      appComponent.ngOnInit();
      expect(mockAuthService.getAuth).toHaveBeenCalled();
    });

    it('should subscribe to AuthService\'s getAuth() return value', () => {
      let subscribe = jasmine.createSpy('subscribe');
      mockAuthService.getAuth.and.returnValue({ subscribe });

      appComponent.ngOnInit();
      expect(subscribe).toHaveBeenCalled();
    });

    it('should set userPresence if user is authenticated', () => {
      appComponent.ngOnInit();
      expect(mockAuthService.setUserPresence).toHaveBeenCalledWith({ uid: 'uid' });
    });

    it('should log error out if fail to subscribe to AuthService\'s getAuth()', () => {
      mockAuthService.getAuth.and.returnValue(Observable.throw({}));

      appComponent.ngOnInit();
      expect(mockLoggerService.error).toHaveBeenCalled();
    })

  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from AuthService\'s getAuth() method', () => {
      appComponent.authSub = jasmine.createSpyObj('authSub', ['unsubscribe']);

      appComponent.ngOnDestroy();
      expect(appComponent.authSub.unsubscribe).toHaveBeenCalled();
    })
  })

});
