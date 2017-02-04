import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ThietbisService } from '../shared/thietbis.service';
import { ThietBi } from '../shared/thietbis.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-input-thietbis-list-results',
  templateUrl: './input-thietbis-list-results.component.html',
  styleUrls: ['./input-thietbis-list-results.component.scss']
})
export class InputThietbisListResultsComponent implements OnInit, OnDestroy {

  thietbis: ThietBi[] = [];
  routeSub: Subscription;
  currentPage: number = 1;
  queryTime: number = 0;
  numOfMatchingItems: number = 0;

  constructor(
    private route: ActivatedRoute,
    private thietbisService: ThietbisService
  ) { }

  ngOnInit() {

    this.routeSub = this.route.queryParams
      .do(params => this.currentPage = +params['page'] || 1)
      .switchMap(params => this.thietbisService.getThietBis(params))
      .do(results => {
        this.queryTime = results.took;
        this.numOfMatchingItems = results.hits.total;
      })
      .map(results => results.hits.hits)
      .map(results => results.map(item => item._source))
      .subscribe(thietbis => {
        console.log('data: ', thietbis);
        this.thietbis = thietbis || [];
      });
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

}
