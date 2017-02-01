import { Injectable, Inject } from '@angular/core';
import { AuthService } from '../../core/shared/auth.service';
import { ThietBi } from './thietbis.model';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

declare var moment: any;

@Injectable()
export class ThietbisService {

  constructor(
    private af: AngularFire,
    private authService: AuthService,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) { }

  resolveMetadataBeforeAddNew(rawData: ThietBi) {
    return this.authService.getAuth()
      .take(1)
      .switchMap(auth => {
        rawData.createdAt = moment().format(this.appConfig['time.defaultDisplayFormat']);
        rawData.createdBy = auth.uid;
        rawData.createdByEmail = auth.auth.email;
        return Observable.of(rawData);
      });
  }

  addNew(preparedData: ThietBi) {
    let done = new Subject<any>();
    let done$ = done.asObservable();
    
    this.af.database.list(this.appConfig['db.fbRefThietbisList'])
      .push(preparedData)
      .then(success => { done.next(success); done.complete(); })
      .catch(error => done.error(error));
    return done$;
  }


}
