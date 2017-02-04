import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
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
    private http: Http,
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

  getThietBis(queryParams) {
    // options.page = options.page ? +options.page : 1;
    // options.nhom = options.nhom ? options.nhom : '';
    // options.search = options.search ? options.search : '';
    // options.searchBy = options.searchBy ? options.searchBy: this.appConfig['thietbis.defaultSearchBy'];

    let options = {
      "query": { 
        "query_string": {
          "query": "*no*",
          "fields": ["maThietBi", "maTopX", "maMaximo"]
        }
      },
      "from": 0,
	    "size": 10,
      "sort": { "maThietBi": { "order": "asc" } }
      // "_source": ["maThietBi"],
    }

    let username = 'hsoyhafg';
    let password = 'd2mq1g5dfcfvnrmr';
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password)); 
    headers.append("Content-Type", "application/json");

    // return this.http.post(this.appConfig['es.searchRefThietBi'], options);
    return this.http.post('https://maple-8497094.us-east-1.bonsaisearch.net/firebase/thietbi/_search', options, {headers: headers});
    
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
