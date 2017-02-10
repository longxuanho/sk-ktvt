import { Injectable, Inject } from '@angular/core';

@Injectable()
export class RouteChangeGuardService {

  targetUrl = '/nhap-lieu/thiet-bi';

  constructor(
  ) {}

  routeChangeGuard(routeParams: RouteChangeGuarded) {
    this.targetUrl = routeParams.url || '/nhap-lieu/thiet-bi';
  }

}

export class RouteChangeGuarded {
  url: string;
}
