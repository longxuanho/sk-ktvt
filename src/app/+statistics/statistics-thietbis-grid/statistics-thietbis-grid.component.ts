import { Component, OnInit, AfterViewInit, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ThietBi } from '../../core/shared/thietbis.model';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { Subscription } from 'rxjs/Subscription';
import { columns, schema, sortMultiFilterColumns } from './statistics-thietbis-grid.model';
import { ThietbisTreeViewService } from '../shared/thietbis-tree-view.service';


declare var $: any;
declare var kendo: any;
declare var moment: any;

@Component({
  selector: 'sk-statistics-thietbis-grid',
  templateUrl: './statistics-thietbis-grid.component.html',
  styleUrls: ['./statistics-thietbis-grid.component.scss']
})
export class StatisticsThietbisGridComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() thietbis: ThietBi[];
  thietbisData: ThietBi[];

  gridReady: boolean = false;
  gridDataSource: any;
  nodeSelected;
  nodeSelectedSub: Subscription;
  
  constructor(
    private thietbisTreeViewService: ThietbisTreeViewService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) { }

  initDataSource() {
    this.gridDataSource = new kendo.data.DataSource({
      data: [],
      schema: schema,
      pageSize: 20,
      sort: { field: "maThietBi", dir: "asc" }
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
      selectable: "multiple",
      columnMenu: true,
      pageable: {
        refresh: true,
        pageSizes: true,
        buttonCount: 5
      },
      columns: columns,
      filterMenuInit: function(e) {
        if (sortMultiFilterColumns.indexOf(e.field) > -1) {
          var filterMultiCheck = this.thead.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck")
          filterMultiCheck.container.empty();
          filterMultiCheck.checkSource.sort({field: e.field, dir: "asc"});

          filterMultiCheck.checkSource.data(filterMultiCheck.checkSource.view().toJSON());
          filterMultiCheck.createCheckBoxes();
        }
      },
    });

    $(".k-pager-refresh").unbind('click').click((event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      this.gridDataSource.data(this.thietbis);
    })
  }

  resolveThietbisData() {
    if (this.nodeSelected && this.nodeSelected.value && this.nodeSelected.field)
      this.thietbisData = this.thietbis.filter( thietbi => thietbi[this.nodeSelected.field] === this.nodeSelected.value );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.gridReady && changes['thietbis']) {
      this.thietbisData = changes['thietbis'].currentValue;
      this.resolveThietbisData();

      this.gridDataSource.data(this.thietbisData);
    }
  }

  ngOnInit() {
    this.nodeSelectedSub = this.thietbisTreeViewService.nodeSelected$
      .subscribe(node => {
        this.nodeSelected = node;
        this.resolveThietbisData();

        this.gridDataSource.data(this.thietbisData);
      })
  }

  ngAfterViewInit() {
    this.gridReady = true;
    this.initDataSource();
    this.initGrid();
  }

  ngOnDestroy() {
    if (this.nodeSelectedSub)
      this.nodeSelectedSub.unsubscribe();
  }

}