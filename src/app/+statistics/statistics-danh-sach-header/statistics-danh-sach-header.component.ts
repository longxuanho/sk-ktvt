import { Component, OnInit, Input, Inject } from '@angular/core';
import { ThietBi } from '../../core/shared/thietbis.model';
import { APP_CONFIG, AppConfig } from '../../app.config';

declare var moment: any;

@Component({
  selector: 'sk-statistics-danh-sach-header',
  templateUrl: './statistics-danh-sach-header.component.html',
  styleUrls: ['./statistics-danh-sach-header.component.scss']
})
export class StatisticsDanhSachHeaderComponent implements OnInit {

  @Input() numOfThietbis: number;
  now: string = moment().format(this.appConfig['time.customFullDate']);

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) { }

  ngOnInit() {
  }

}
