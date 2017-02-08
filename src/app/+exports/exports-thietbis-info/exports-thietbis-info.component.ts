import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sk-exports-thietbis-info',
  templateUrl: './exports-thietbis-info.component.html',
  styleUrls: ['./exports-thietbis-info.component.scss']
})
export class ExportsThietbisInfoComponent implements OnInit {

  @Input() numOfItems: number;

  constructor() { }

  ngOnInit() {
  }

}
