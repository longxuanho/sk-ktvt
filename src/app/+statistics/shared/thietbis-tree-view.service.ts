import { Injectable } from '@angular/core';
import { ThietBi } from '../../core/shared/thietbis.model';

declare var kendo: any;

@Injectable()
export class ThietbisTreeViewService {

  constructor() { }

  resolveTreeView(aggregateMode: string, rawData: ThietBi[]) {
    console.log('rawData: ', rawData);
    if (aggregateMode === 'phan_loai')
      return this.resolveTopGroupNhom(rawData);
    return [];
  }

  private resolveTopGroupNhom(rawData: ThietBi[]) {
    if (!rawData || rawData.length)
      return [];
    
  }

}
