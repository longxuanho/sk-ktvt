import { Component, OnInit, AfterViewInit, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ThietBi } from '../../core/shared/thietbis.model';
import { columns, schema } from './thietbis-grid.model';
import { APP_CONFIG, AppConfig } from '../../app.config';

declare var $: any;
declare var kendo: any;
declare var moment: any;

@Component({
  selector: 'sk-exports-thietbis-grid',
  templateUrl: './exports-thietbis-grid.component.html',
  styleUrls: ['./exports-thietbis-grid.component.scss']
})
export class ExportsThietbisGridComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() thietbis: ThietBi[];
  gridReady: boolean = false;
  gridDataSource: any;

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.gridReady && changes['thietbis']) {
      this.gridDataSource.data(changes['thietbis'].currentValue);
    }
  }

  initDataSource() {
    this.gridDataSource = new kendo.data.DataSource({
      data: [],
      schema: schema,
      pageSize: 20
    });
  }

  initGrid() {
    $("#grid").kendoGrid({
      dataSource: this.gridDataSource,
      height: 550,
      groupable: true,
      reorderable: true,
      resizable: true,
      filterable: true,
      sortable: true,
      // columnMenu: true,
      pageable: {
        refresh: true,
        pageSizes: true,
        buttonCount: 5
      },
      toolbar: ["excel"],
      excel: {
        fileName: `Thuc Luc Phuong Tien - ${ moment().format(this.appConfig['time.defaultExcelFileName']) }.xlsx`,
        proxyURL: "https://live.snp-skynet.com/export/thiet-bi",
        filterable: true,
        allPages: true
      },
      columns: columns
    });

    $(".k-pager-refresh").unbind('click').click((event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log('refresh dataSource...');
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gridReady = true;
    this.initDataSource();
    this.initGrid();
  }

}
