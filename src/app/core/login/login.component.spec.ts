/* tslint:disable:no-unused-variable */
import { LoginComponent } from './login.component';
import { UserCredentials } from '../shared/auth.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

describe('LoginComponent', () => {

    let loginComponent: LoginComponent,
        credentials: UserCredentials,
        mockAuthService, mockFormBuilderService, mockLoggerService, mockRouterService, mockAppConstants;

    beforeEach(() => {
        mockAuthService = jasmine.createSpyObj('mockAuthService', ['login']);
        mockAppConstants = { 'validator.emailPattern': 'emailPattern' };
        mockFormBuilderService = jasmine.createSpyObj('mockFormBuilderService', ['group']);
        mockLoggerService = jasmine.createSpyObj('mockAuthService', ['success', 'error']);
        mockRouterService = jasmine.createSpyObj('mockRouterService', ['navigate'])
        mockFormBuilderService.group.and.returnValue(null);

        loginComponent = new LoginComponent(
            mockAuthService,
            mockFormBuilderService,
            mockLoggerService,
            mockRouterService,
            mockAppConstants
        );
    });

    describe('constructor', () => {

        it('should call buildForm method to initialize new form', () => {
            spyOn(LoginComponent.prototype, 'buildForm');
            loginComponent = new LoginComponent(
                mockAuthService,
                mockFormBuilderService,
                mockLoggerService,
                mockRouterService,
                mockAppConstants
            );

            expect(loginComponent.buildForm).toHaveBeenCalled();
        });

    });

    describe('onLogin', () => {

        beforeEach(() => {            
            credentials = {
                email: 'test@gmail.com',
                password: '12345'
            }
        });

        it('should call login method from AuthService with credentials', () => {

            mockAuthService.login.and.returnValue(Observable.of(true));

            loginComponent.onLogIn(credentials);
            expect(mockAuthService.login).toHaveBeenCalledWith({
                email: 'test@gmail.com',
                password: '12345'
            })
        });

        it('should navigate to dashboard if success', () => {
            mockAuthService.login.and.returnValue(Observable.of(true));

            loginComponent.onLogIn(credentials);
            expect(mockRouterService.navigate).toHaveBeenCalledWith(['/bang-tin']);
        });

        it('should call LoggerService\'s success method if success', () => {
            mockAuthService.login.and.returnValue(Observable.of(true));

            loginComponent.onLogIn(credentials);
            expect(mockLoggerService.success).toHaveBeenCalled();
        });

        it('should call LoggerService\'s error method if fails', () => {
            mockAuthService.login.and.returnValue(Observable.throw({}));

            loginComponent.onLogIn(credentials);
            expect(mockLoggerService.error).toHaveBeenCalled();
        });

    });

});
