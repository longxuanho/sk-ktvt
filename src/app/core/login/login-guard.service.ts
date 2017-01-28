import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService) { }
  
  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated()
      .take(1)
      .map(auth => !auth);
  }
}