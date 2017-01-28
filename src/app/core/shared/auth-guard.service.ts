import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated()
      .take(1)
      .map(auth => !!auth)
      .do((authState) => {
        if (!authState)
          this.router.navigate(['/dang-nhap']);
      });
  }
}