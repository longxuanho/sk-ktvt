import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ThietBi } from '../../core/shared/thietbis.model';
import { ThietbisTreeViewService, Strategies, StrategyOptions } from '../shared/thietbis-tree-view.service';

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
  selectedStrategy = 'dv_so_huu';

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
              console.log(Strategies[this.selectedStrategy].slice(-1)[0]);
              return item.hasSubgroups && (item.field !== Strategies[this.selectedStrategy].slice(-1)[0]);
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

  onNextStrategy() {
    let index = StrategyOptions.indexOf(this.selectedStrategy) + 1;
    index = (index < StrategyOptions.length) ? index : 0;
    this.selectedStrategy = StrategyOptions[index];

    let result = this.thietbisTreeViewService.resolveTreeView(this.selectedStrategy, this.thietbis);
    result.fetch(() => {
      console.log('result: ', result.view().toJSON());
      this.treeViewDataSource.data(result.view().toJSON());
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.treeViewReady && changes['thietbis']) {
      let result = this.thietbisTreeViewService.resolveTreeView(this.selectedStrategy, changes['thietbis'].currentValue);

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
