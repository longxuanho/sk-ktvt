import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ThietBi } from '../../core/shared/thietbis.model';
import { ThietbisTreeViewService } from '../shared/thietbis-tree-view.service';

declare var $: any;
declare var kendo: any;

@Component({
  selector: 'sk-statistics-tree-view',
  templateUrl: './statistics-tree-view.component.html',
  styleUrls: ['./statistics-tree-view.component.scss']
})
export class StatisticsTreeViewComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  treeViewReady: boolean = false;
  treeViewDataSource: any;

  @Input() thietbis: ThietBi[];
  @Input() expanded: boolean;

  constructor(
    private thietbisTreeViewService: ThietbisTreeViewService
  ) { }

  initDataSource() {
    this.treeViewDataSource = new kendo.data.HierarchicalDataSource({
        data: [],
        schema: {
          model: {
            hasChildren: (item) => {
              return item.hasSubgroups && (item.field !== "hangSanXuat");
            },
            children: "items",
          }
        }
    })
  }

  initTreeView() {
    $("#treeview").kendoTreeView({
      template: `
        #= item.value # 
        # if (item.aggregates) { #
          ( #= item.aggregates[item.field]['count'] # )
        # } #
        `,
      dataSource: this.treeViewDataSource,
      select: (event) => {
        let selectedNode = $('#treeview').data('kendoTreeView').dataItem(event.node);
        this.thietbisTreeViewService.selectNode(selectedNode.toJSON());
      }
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.treeViewReady && changes['thietbis']) {
      let result = this.thietbisTreeViewService.resolveTreeView('phan_loai', changes['thietbis'].currentValue);

      result.fetch(() => {
        console.log('result: ', result.view().toJSON());
        this.treeViewDataSource.data(result.view().toJSON());
      })
    }
  }

  ngAfterViewInit() {
    this.treeViewReady = true;
    this.initDataSource();
    this.initTreeView();
  }

  ngOnDestroy() {
  }

}
