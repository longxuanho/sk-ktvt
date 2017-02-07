import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sk-thietbis-list-result-info',
  templateUrl: './thietbis-list-result-info.component.html',
  styleUrls: ['./thietbis-list-result-info.component.scss']
})
export class ThietbisListResultInfoComponent implements OnInit {

  @Input() numOfMatchingItems: number;
  @Input() queryTime: number;

  constructor() { }

  ngOnInit() {
  }

}
