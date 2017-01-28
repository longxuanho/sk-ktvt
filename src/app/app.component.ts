import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './core/shared/auth.service';
import { AngularFireAuth } from 'angularfire2';
import { LoggerService } from './core/shared/logger.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  authSub: Subscription;

  constructor(private authService: AuthService, private loggerService: LoggerService) {}
  
  ngOnInit() {
    this.authSub = this.authService.getAuth()
      .subscribe(
        (auth) => {
          if (!!auth)
            this.authService.setUserPresence(auth.auth);
        },
        (error) => this.loggerService.error(error.message, 'Opps', error)
      )
  }

  ngOnDestroy() {
    if (this.authSub)
      this.authSub.unsubscribe();
  }
}
