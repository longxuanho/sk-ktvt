import { Component, OnInit } from '@angular/core';
import { ThietbisService } from '../shared/thietbis.service';
import { ThietBi } from '../shared/thietbis.model';

@Component({
  selector: 'sk-input-thietbis-list-results',
  templateUrl: './input-thietbis-list-results.component.html',
  styleUrls: ['./input-thietbis-list-results.component.scss']
})
export class InputThietbisListResultsComponent implements OnInit {

  thietbis: ThietBi[] = [];

  constructor(
    private thietbisService: ThietbisService
  ) { }

  getThietBis() {
    this.thietbisService.getThietBis()
      .subscribe(thietbis => this.thietbis = thietbis);
  }

  ngOnInit() {
    this.getThietBis();
  }

}
