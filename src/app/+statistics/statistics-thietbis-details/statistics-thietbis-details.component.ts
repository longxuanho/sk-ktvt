import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
  
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private thietBisService: ThietbisService
  ) { }

  goBack(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.location.back();
  }

  ngOnInit() {
    this.routeSub = this.route.params
      .switchMap((params) => this.thietBisService.getThietBi(params["id"]))
      .subscribe((thietbi: ThietBi) => {
        this.selectedThietBi = thietbi;
        console.log('data back: ', thietbi);
      });
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

}
