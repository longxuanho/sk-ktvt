import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { RouteChangeGuardService } from '../shared/route-change-guard.service';
import { Router, NavigationCancel } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

declare var screenfull: any;

@Component({
  selector: 'sk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  routerSub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private routeChangeGuardedService: RouteChangeGuardService
  ) { }

  toggleFullScreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  ngOnInit() {
    this.routerSub = this.router.events
      .subscribe((event) => {
         if(event instanceof NavigationCancel) {
           this.routeChangeGuardedService.routeChangeGuard({ url: event.url });
         }
      });
  }

  ngOnDestroy() {
    if (this.routerSub)
      this.routerSub.unsubscribe();
  }

}
