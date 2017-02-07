import { Component, OnInit, Input } from '@angular/core';
import { ThietBi } from '../../core/shared/thietbis.model';

@Component({
  selector: 'sk-thietbis-list-result-item',
  templateUrl: './thietbis-list-result-item.component.html',
  styleUrls: ['./thietbis-list-result-item.component.scss']
})
export class ThietbisListResultItemComponent implements OnInit {

  @Input() thietbi: ThietBi;
  @Input() routeName: string;

  constructor() { }

  ngOnInit() {
  }

}
