import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ThietbisService } from '../shared/thietbis.service';
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

  pageStatus: string;
  isRequestError: boolean;
  isLoading: boolean;

  searchText: string;
  searchBy: string;
  nhomFilterBy: string;
  currentPage: number = 1;
  queryTime: number = 0;
  numOfMatchingItems: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private thietbisService: ThietbisService,
    @Inject(APP_CONFIG) private appConfig: AppConfig 
  ) { }

  handleError(error) {
    this.isLoading = false;
    this.isRequestError = true;
    this.pageStatus = 'Truy vấn không thành công. Xin vui lòng thử lại ..';
    console.error('Truy vấn dữ liệu từ Bonsai thất bại. Chi tiết:', error);
  }

  ngOnInit() {
    this.routeSub = this.route.queryParams
      .do(params => { 
        this.currentPage = +params['page'] || 1;
        this.searchText = params['search'] || '';
        this.searchBy = params['searchBy'] || this.appConfig['thietbis.defaultSearchBy'];
        this.nhomFilterBy = params['nhom'] || this.appConfig['thietbis.defaultNhomFilterBy'];
      })
      .switchMap(params => {
        this.isLoading = true;
        this.pageStatus = 'Xin vui lòng chờ trong giây lát ..';
        return this.thietbisService.getThietBis(params);
        })
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
        (thietbis: ThietBi[]) => {
          this.isRequestError = false;
          this.isLoading = false;
          
          this.thietbis = thietbis || [];
          this.pageStatus = thietbis.length ? '' : 'Không có kết quả phù hợp với yêu cầu của bạn' 
        },
        error => this.handleError(error) );
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

}
