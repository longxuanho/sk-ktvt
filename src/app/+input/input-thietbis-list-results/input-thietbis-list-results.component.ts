import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ThietbisService } from '../shared/thietbis.service';
import { ThietbisSearchService } from '../shared/thietbis-search.service';
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
  searchTextSub: Subscription;
  currentPage: number = 1;
  queryTime: number = 0;
  numOfMatchingItems: number = 0;
  routeParams;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private thietbisService: ThietbisService,
    private thietbisSearchService: ThietbisSearchService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.queryParams
      .do(params => { 
        this.currentPage = +params['page'] || 1;
        this.routeParams = Object.assign({}, params);
      })
      .switchMap(params => this.thietbisService.getThietBis(params))
      .do(results => {
        this.queryTime = results.took;
        this.numOfMatchingItems = results.hits.total;
        })
      .map(results => results.hits.hits)
      .map(results => results.map(
        item => {
          let newItem = item._source;
          newItem.$key = item._id;
          return newItem;
        }))
      .subscribe(thietbis => this.thietbis = thietbis || []);

    this.searchTextSub = this.thietbisSearchService.searchText$
      .subscribe(searchText => 
        this.router.navigate(['/nhap-lieu/thiet-bi'], { 
          queryParams: { 
            page: this.currentPage,
            search: searchText
          } 
        }));
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
    if (this.searchTextSub)
      this.searchTextSub.unsubscribe();
  }

}
