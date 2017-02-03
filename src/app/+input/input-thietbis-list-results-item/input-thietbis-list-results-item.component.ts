import { Component, OnInit, Input } from '@angular/core';
import { ThietBi } from '../shared/thietbis.model';

@Component({
  selector: 'sk-input-thietbis-list-results-item',
  templateUrl: './input-thietbis-list-results-item.component.html',
  styleUrls: ['./input-thietbis-list-results-item.component.scss']
})
export class InputThietbisListResultsItemComponent implements OnInit {

  @Input() thietbi: ThietBi;

  constructor() { }

  ngOnInit() {
  }

}
