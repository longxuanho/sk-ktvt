import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SearchQueryParams } from '../../shared/thietbis-search/thietbis-search.model';

@Component({
  selector: 'sk-input-thietbis-list-nav',
  templateUrl: './input-thietbis-list-nav.component.html',
  styleUrls: ['./input-thietbis-list-nav.component.scss']
})
export class InputThietbisListNavComponent implements OnInit, OnDestroy {

  @Input() numOfMatchingItems: number;
  routeSub: Subscription;
  lastQueryParams: SearchQueryParams;

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  getPage(page: number) {
    let queryParams = Object.assign({}, this.lastQueryParams);
    queryParams.page = +page || 1;
    this.router.navigate(['/nhap-lieu/thiet-bi'], { queryParams });
  }

  ngOnInit() {
    this.routeSub = this.route.queryParams
      .subscribe(query => {
        this.lastQueryParams = query;
      })
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }
  
}
