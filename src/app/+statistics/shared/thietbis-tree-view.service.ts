import { Injectable } from '@angular/core';
import { ThietBi } from '../../core/shared/thietbis.model';
import { Subject } from 'rxjs/Subject';

declare var kendo: any;

@Injectable()
export class ThietbisTreeViewService {

  private nodeSelectedSource = new Subject<SelectedTreeViewNode>();
  nodeSelected$ = this.nodeSelectedSource.asObservable();

  constructor() { }

  selectNode(node: SelectedTreeViewNode) {
    this.nodeSelectedSource.next(node);
  }

  resolveTreeView(groupMode: string, rawData: ThietBi[]) {
    console.log('rawData: ', rawData);
    if (groupMode === 'phan_loai')
      return this.resolveGroupModePhanLoai(rawData);
    return [];
  }

  private resolveGroupModePhanLoai(rawData: ThietBi[]) {
    if (!rawData || !rawData.length)
      return [];

    let dataSource = new kendo.data.DataSource({
      data: rawData,
      group: [
        { field: "nhom", aggregates: [{ field: "nhom", aggregate: "count" }] },
        { field: "chungLoai", aggregates: [{ field: "chungLoai", aggregate: "count" }] },
        { field: "loai", aggregates: [{ field: "loai", aggregate: "count" }] },
        { field: "hangSanXuat", aggregates: [{ field: "hangSanXuat", aggregate: "count" }] }
      ],
      aggregate: [{ field: "chungLoai", aggregate: "count" }]
    });

    return dataSource;
  }


  // function that gathers IDs of checked nodes
  collectCheckedNodeIds(nodes, checkedNodes) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].checked) {
        checkedNodes.push(nodes[i].id);
      }

      if (nodes[i].hasChildren) {
        this.collectCheckedNodeIds(nodes[i].children.view(), checkedNodes);
      }
    }
  }

}

class SelectedTreeViewNode {
  field?: string;
  value?: string;
}
