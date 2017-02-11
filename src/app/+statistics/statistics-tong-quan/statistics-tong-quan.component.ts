import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ThietbisService } from '../../core/shared/thietbis.service';
import { ThietBi } from '../../core/shared/thietbis.model';
import { LoggerService } from '../../core/shared/logger.service';

import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'sk-statistics-tong-quan',
  templateUrl: './statistics-tong-quan.component.html',
  styleUrls: ['./statistics-tong-quan.component.scss']
})
export class StatisticsTongQuanComponent implements OnInit, OnDestroy, AfterViewInit {

  thietbis: ThietBi[] = [];
  panelCollapsed = false;
  isLoading: boolean;

  constructor(
    private thietbisService: ThietbisService,
    private loggerService: LoggerService
  ) { }

  togglePanel() {
    this.panelCollapsed = !this.panelCollapsed;
    window.setTimeout(() => $('#grid').data('kendoGrid').refresh());
  }

  handleError(error) {
    this.loggerService.error(error.message, 'Truy vấn thất bại.', error);
  }

  getAllThietBis() {
    this.isLoading = true;

    this.thietbisService.getAllThietBis()
      .subscribe(
        (thietbis: ThietBi[]) => {
          this.isLoading = false;
          this.thietbis = this.thietbisService.validateDataBeforeFetchToDataSource(thietbis);
        },
        (error: Error) => {
          this.isLoading = false;
          this.handleError(error);
        });
  }

  onDataRefreshed(event: Event) {
    this.getAllThietBis();
  }

  ngOnInit() {
    this.getAllThietBis();
  }

  ngAfterViewInit() {
    $("#panelbar").kendoPanelBar({
        expandMode: "single"
    });
  }

  ngOnDestroy() {
  }

}
