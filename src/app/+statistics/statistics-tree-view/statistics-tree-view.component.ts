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

  constructor(
    private thietbisTreeViewService: ThietbisTreeViewService
  ) { }

  initDataSource() {
    this.treeViewDataSource = new kendo.data.HierarchicalDataSource({
        data: [
          { value: 'Thiết bị nâng', hasSubgroups: true, field: "nhom", items: [
              { value: 'Cẩu bờ', hasSubgroups: true, field: "chungLoai", items: [
                  { value: 'KE', hasSubgroups: true, field: "loai", items: [
                      { value: 'ABB', hasSubgroups: true, field: "hangSanXuat", items: [
                          { uid: 'test', hasSubgroups: false }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        schema: {
          model: {
            hasChildren: (item) => {
              return item.hasSubgroups && (item.field !== "hangSanXuat");
            },
            children: "items"
          }
        }
    })
  }

  initTreeView() {
    $("#treeview").kendoTreeView({
      dataSource: this.treeViewDataSource,
      dataTextField: "value",
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.treeViewReady && changes['thietbis']) {
      let result = this.thietbisTreeViewService.resolveTreeView('phan_loai', changes['thietbis'].currentValue);
      // this.treeViewDataSource = result;

      result.fetch(() => {
        console.log('result: ', result.view().toJSON());
        // $("#treeview").kendoTreeView({
        //   dataSource:  result.view().toJSON(),
        //   dataTextField: "value",
        // });

      })
    }
  }

  ngAfterViewInit() {
    this.treeViewReady = true;
    this.initDataSource();
    this.initTreeView();
  }

  ngOnDestroy() {
     $("#treeview").kendoTreeView().destroy();
  }

}
