import { Component, OnInit, Input, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app.config';

declare var moment: any;

@Component({
  selector: 'sk-thietbis-list-result-info',
  templateUrl: './thietbis-list-result-info.component.html',
  styleUrls: ['./thietbis-list-result-info.component.scss']
})
export class ThietbisListResultInfoComponent implements OnInit {

  @Input() numOfMatchingItems: number;
  @Input() queryTime: number;
  @Input() hideCurrentDate: boolean;
  now: string = moment().format(this.appConfig['time.customFullDate']);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) { }

  ngOnInit() {
  }

}
