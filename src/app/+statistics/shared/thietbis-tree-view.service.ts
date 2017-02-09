import { Injectable } from '@angular/core';
import { ThietBi } from '../../core/shared/thietbis.model';
import { Subject } from 'rxjs/Subject';

declare var kendo: any;


@Injectable()
export class ThietbisTreeViewService {

  private nodeSelectedSource = new Subject<SelectedTreeViewNode>();
  nodeSelected$ = this.nodeSelectedSource.asObservable();

  constructor() { }

  selectNodes(nodes: SelectedTreeViewNode[]) {
    this.nodeSelectedSource.next(nodes);
  }

  resolveTreeView(strategyName: string, rawData: ThietBi[]) {
    if (!Strategies[strategyName])
      return [];
    return this.resolveStrategy(Strategies[strategyName], rawData);
  }

  private resolveStrategy(groupStrategy: string[], rawData: ThietBi[]) {
    if (!rawData || !rawData.length)
      return [];

    let groupResults = [];
    groupStrategy.forEach(groupName => {
      groupResults.push({ field: groupName, aggregates: [{ field: groupName, aggregate: "count" }] });
    });

    let dataSource = new kendo.data.DataSource({
      data: rawData,
      group: groupResults
    });

    return dataSource;
  }

}

export const StrategyOptions = ['phan_nhom', 'khu_vuc', 'dv_quan_ly', 'dv_so_huu'];

export const Strategies: { [key: string]: string[] } = {
  phan_nhom: ['nhom', 'chungLoai', 'loai', 'hangSanXuat'],
  khu_vuc: ['khuVuc', 'nhom', 'loai', 'hangSanXuat'],
  dv_quan_ly: ['dvQuanLy', 'loai', 'hangSanXuat'],
  dv_so_huu: ['dvSoHuu', 'loai', 'hangSanXuat']
}

export class SelectedTreeViewNode {
  field?: string;
  value?: string;
  operator?: string;
}
