import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchQueryParams } from '../../shared/thietbis-search/thietbis-search.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-statistics-danh-sach-nav',
  templateUrl: './statistics-danh-sach-nav.component.html',
  styleUrls: ['./statistics-danh-sach-nav.component.scss']
})
export class StatisticsDanhSachNavComponent implements OnInit, OnDestroy {

  @Input() numOfMatchingItems: number;
  lastQueryParams: SearchQueryParams;
  routeSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  getPage(page: number) {
    if (!!page) {
      let queryParams = Object.assign({}, this.lastQueryParams);
      queryParams.page = +page;
      this.router.navigate(['/thong-ke/danh-sach'], { queryParams });
    }
  }

  ngOnInit() {
    this.routeSub = this.route.queryParams
      .subscribe((query: SearchQueryParams) => {
        this.lastQueryParams = query;
      });
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

}
