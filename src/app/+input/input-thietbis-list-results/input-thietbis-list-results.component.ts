import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ThietbisService } from '../shared/thietbis.service';
import { ThietbisSearchService } from '../shared/thietbis-search.service';
import { ThietBi } from '../shared/thietbis.model';
import { Subscription } from 'rxjs/Subscription';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Component({
  selector: 'sk-input-thietbis-list-results',
  templateUrl: './input-thietbis-list-results.component.html',
  styleUrls: ['./input-thietbis-list-results.component.scss']
})
export class InputThietbisListResultsComponent implements OnInit, OnDestroy {

  thietbis: ThietBi[] = [];

  routeSub: Subscription;
  searchTextSub: Subscription;
  searchBySub: Subscription;

  searchText: string;
  searchBy: string;
  currentPage: number = 1;
  queryTime: number = 0;
  numOfMatchingItems: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private thietbisService: ThietbisService,
    private thietbisSearchService: ThietbisSearchService,
    @Inject(APP_CONFIG) private appConfig: AppConfig 
  ) { }

  handleError(error) {
    console.error('Truy vấn dữ liệu từ Bonsai thất bại. Chi tiết:', error.json());
  }

  resolveQueryParams() {
    let queryParams = {
      page: this.currentPage,
      searchBy: this.searchBy
    };
    if (this.searchText)
      queryParams['search'] = this.searchText;
      
    return queryParams;
  }

  ngOnInit() {
    this.routeSub = this.route.queryParams
      .do(params => { 
        this.currentPage = +params['page'] || 1;
        this.searchBy = params['searchBy'] || this.appConfig['thietbis.defaultSearchBy'];
        this.searchText = params['search'] || '';
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
      .subscribe(
        thietbis => this.thietbis = thietbis || [],
        error => this.handleError(error) );

    this.searchTextSub = this.thietbisSearchService.searchText$
      .subscribe(searchText => {
        this.searchText = searchText;
        let queryParams = this.resolveQueryParams();

        this.router.navigate(['/nhap-lieu/thiet-bi'], { queryParams });
      });
    this.searchBySub = this.thietbisSearchService.searchBy$
      .subscribe(searchBy => {
        this.searchBy = searchBy;
      });
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
    if (this.searchTextSub)
      this.searchTextSub.unsubscribe();
    if (this.searchBySub)
      this.searchBySub.unsubscribe();
  }

}
