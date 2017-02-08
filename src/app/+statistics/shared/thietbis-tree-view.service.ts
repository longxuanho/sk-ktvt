import { Injectable } from '@angular/core';
import { ThietBi } from '../../core/shared/thietbis.model';

declare var kendo: any;

@Injectable()
export class ThietbisTreeViewService {

  constructor() { }

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
        { field: "nhom", aggregates: [ { field: "nhom", aggregate: "count" } ] },
        { field: "chungLoai", aggregates: [ { field: "chungLoai", aggregate: "count" } ] },
        { field: "loai", aggregates: [ { field: "loai", aggregate: "count" } ] },
        { field: "hangSanXuat", aggregates: [ { field: "hangSanXuat", aggregate: "count" } ] }
      ],
      aggregate: [ { field: "chungLoai", aggregate: "count" } ]
    });

    let view;
    // dataSource.fetch(() => {
    //   view = dataSource.view();
    //   console.log('numOfGroups: ', view.length);
    //   // console.log('dataSource: ', Array.isArray(dataSource.data().toJSON()), dataSource.data().toJSON())
    //   // console.log('data: ', view.toJSON());
    // });


    return dataSource;
  }

}
