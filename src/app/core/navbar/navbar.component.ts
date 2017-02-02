import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  // routerSub: Subscription;

  constructor(
    private authService: AuthService,
    // private router: Router
    ) { }

  ngOnInit() {
    // this.routerSub = this.router.events
    //   .subscribe((event) => {
    //     console.log('route changed', event);
    //   });
  }

  ngOnDestroy() {
    // if (this.routerSub)
    //   this.routerSub.unsubscribe();
  }

}
