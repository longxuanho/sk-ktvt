import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LoggerService } from '../../core/shared/logger.service';
import { ThietBi } from '../../core/shared/thietbis.model';
import { ThietbisService } from '../../core/shared/thietbis.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-statistics-thietbis-details',
  templateUrl: './statistics-thietbis-details.component.html',
  styleUrls: ['./statistics-thietbis-details.component.scss']
})
export class StatisticsThietbisDetailsComponent implements OnInit {

  routeSub: Subscription;
  selectedThietBi: ThietBi;
  isRequestError: boolean;
  
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private thietBisService: ThietbisService,
    private loggerService: LoggerService
  ) { }

  goBack(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.location.back();
  }

  handleError(error: Error) {
    this.loggerService.error(error.message, 'Truy vấn thất bại', error);
  }

  ngOnInit() {
    this.routeSub = this.route.params
      .switchMap((params) => this.thietBisService.getThietBi(params["id"]))
      .do(() => {
        this.isRequestError = false;
      })
      .subscribe((thietbi: ThietBi) => {
        this.selectedThietBi = thietbi;
      }, 
      (error) => {
        this.isRequestError = true;
        this.handleError(error);
      });
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

}
