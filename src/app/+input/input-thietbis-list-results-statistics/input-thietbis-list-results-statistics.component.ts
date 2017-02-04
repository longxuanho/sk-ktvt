import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sk-input-thietbis-list-results-statistics',
  templateUrl: './input-thietbis-list-results-statistics.component.html',
  styleUrls: ['./input-thietbis-list-results-statistics.component.scss']
})
export class InputThietbisListResultsStatisticsComponent implements OnInit {

  @Input() numOfMatchingItems: number;
  @Input() queryTime: number;

  constructor() { }

  ngOnInit() {
  }

}
