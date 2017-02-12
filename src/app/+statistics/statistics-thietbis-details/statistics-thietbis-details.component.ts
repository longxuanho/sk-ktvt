import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-statistics-thietbis-details',
  templateUrl: './statistics-thietbis-details.component.html',
  styleUrls: ['./statistics-thietbis-details.component.scss']
})
export class StatisticsThietbisDetailsComponent implements OnInit {

  routeSub: Subscription;
  
  constructor(
    private location: Location,
    private route: ActivatedRoute
  ) { }

  goBack(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.location.back();
  }

  ngOnInit() {
    this.routeSub = this.route.params
      .subscribe(params => {

      });
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

}
