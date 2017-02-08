import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ThietBi } from '../../core/shared/thietbis.model';
import { columns, schema } from './thietbis-grid.model';

declare var $: any;
declare var kendo: any;

@Component({
  selector: 'sk-exports-thietbis-grid',
  templateUrl: './exports-thietbis-grid.component.html',
  styleUrls: ['./exports-thietbis-grid.component.scss']
})
export class ExportsThietbisGridComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() thietbis: ThietBi[];
  gridReady: boolean = false;
  gridDataSource: any;

  constructor() {
  }

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
      height: 500,
      groupable: true,
      sortable: true,
      pageable: {
        refresh: true,
        pageSizes: true,
        buttonCount: 5
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
