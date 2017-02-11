import { Component, OnInit, Input, Inject } from '@angular/core';
import { ThietBi } from '../../core/shared/thietbis.model';
import { APP_CONFIG, AppConfig } from '../../app.config';

declare var moment: any;

@Component({
  selector: 'sk-statistics-tong-quan-header',
  templateUrl: './statistics-tong-quan-header.component.html',
  styleUrls: ['./statistics-tong-quan-header.component.scss']
})
export class StatisticsTongQuanHeaderComponent implements OnInit {

  @Input() numOfThietbis: number;
  @Input() isLoading: boolean;
  now: string = moment().format(this.appConfig['time.customFullDate']);

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) { }

  ngOnInit() {
  }

}
