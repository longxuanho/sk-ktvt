import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ThietbisService } from '../../core/shared/thietbis.service';
import { ThietBi } from '../../core/shared/thietbis.model';
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

  constructor(
    private thietbisService: ThietbisService
  ) { }

  togglePanel() {
    this.panelCollapsed = !this.panelCollapsed;
    window.setTimeout(() => $('#grid').data('kendoGrid').refresh());
  }

  getAllThietBis() {
    this.thietbisService.getAllThietBis()
      .subscribe((thietbis: ThietBi[]) => this.thietbis = thietbis);
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
