import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
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
  selectedStrategy = 'phan_nhom';
  panelCollapsed = false;

  @Input() thietbis: ThietBi[];
  @Input() expanded: boolean;
  @Output() onPanelToggled = new EventEmitter<boolean>();

  constructor(
    private thietbisTreeViewService: ThietbisTreeViewService
  ) { }

  get SelectedStrategy(): string {
    let displayText = ['Phân nhóm', 'Khu vực', 'ĐV Quản lý', 'ĐV Sở hữu'],
        currentIndex = StrategyOptions.indexOf(this.selectedStrategy);
    return displayText[currentIndex];
  }

  initDataSource() {
    this.treeViewDataSource = new kendo.data.HierarchicalDataSource({
        data: [],
        schema: {
          model: {
            hasChildren: (item) => {
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
        let treeview = $('#treeview').data('kendoTreeView'),
            selectedNodes = [],
            currentNode = event.node;
        
        while (treeview.dataItem(currentNode)) {
          selectedNodes.push( treeview.dataItem(currentNode).toJSON() );
          currentNode = treeview.parent(currentNode);
        }
        this.thietbisTreeViewService.selectNodes(selectedNodes);
      }
    });
  }

  togglePanel() {
    this.panelCollapsed = !this.panelCollapsed;
    this.onPanelToggled.emit(this.panelCollapsed);
  }

  nextStrategy(event: Event) {
    event.preventDefault();

    let index = StrategyOptions.indexOf(this.selectedStrategy) + 1;
    index = (index < StrategyOptions.length) ? index : 0;
    this.selectedStrategy = StrategyOptions[index];

    let result = this.thietbisTreeViewService.resolveTreeView(this.selectedStrategy, this.thietbis);
    result.fetch(() => {
      this.treeViewDataSource.data(result.view().toJSON());
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.treeViewReady && changes['thietbis']) {
      let result = this.thietbisTreeViewService.resolveTreeView(this.selectedStrategy, changes['thietbis'].currentValue);

      result.fetch(() => {
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
