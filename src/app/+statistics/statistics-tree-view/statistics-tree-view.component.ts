import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ThietBi } from '../../core/shared/thietbis.model';
import { ThietbisTreeViewService } from '../shared/thietbis-tree-view.service';

declare var $: any;
declare var kendo: any;

@Component({
  selector: 'sk-statistics-tree-view',
  templateUrl: './statistics-tree-view.component.html',
  styleUrls: ['./statistics-tree-view.component.scss']
})
export class StatisticsTreeViewComponent implements OnInit, OnChanges, AfterViewInit {

  treeViewReady: boolean = false;
  @Input() thietbis: ThietBi[];

  constructor(
    private thietbisTreeViewService: ThietbisTreeViewService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.treeViewReady && changes['thietbis']) {
      let result = this.thietbisTreeViewService.resolveTreeView('phan_loai', changes['thietbis'].currentValue);
      console.log('result: ', result);
      // this.gridDataSource.data(changes['thietbis'].currentValue);
    }
  }

  ngAfterViewInit() {
    $("#treeview").kendoTreeView();
    this.treeViewReady = true;
  }

}
