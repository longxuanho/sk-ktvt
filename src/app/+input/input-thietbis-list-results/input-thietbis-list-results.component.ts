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

  constructor(
    private route: ActivatedRoute,
    private thietbisService: ThietbisService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.queryParams
      .switchMap(params => {
        this.currentPage = params['page'] ? +params['page'] : 1;
        return this.thietbisService.getThietBis(params)
      })
      .subscribe(thietbis => {
        console.log('data: ', thietbis);
      });
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

}
