import { Component, OnInit, Input, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app.config';

declare var moment: any;

@Component({
  selector: 'sk-exports-thietbis-info',
  templateUrl: './exports-thietbis-info.component.html',
  styleUrls: ['./exports-thietbis-info.component.scss']
})
export class ExportsThietbisInfoComponent implements OnInit {

  @Input() numOfItems: number;
  now: string = moment().format(this.appConfig['time.customFullDate']);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) { }

  ngOnInit() {
  }

}
