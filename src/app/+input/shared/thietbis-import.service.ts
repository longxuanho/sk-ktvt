import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LoggerService } from '../../core/shared/logger.service';
import { ThietBi, RawThietBi } from './thietbis.model';

@Injectable()
export class ThietbisImportService {

  constructor(
    private http: Http,
    private loggerService: LoggerService,
  ) { }

  getRawData() {
    let ref = '/assets/jsons/seed.json';

    return this.http.get(ref)
      .map((res: Response) => res.json());
  }

  resolveThietBi(rawItem: RawThietBi) {
    let result: ThietBi = <ThietBi>{};
    result.maThietBi = rawItem.ma_thiet_bi.keyId;
    result.maMaximo = rawItem.ma_thiet_bi.maximo;
    result.maTopX = rawItem.ma_thiet_bi.topX;

    Object.keys(result).forEach((key) => {
      if (result[key] === undefined)
        delete result[key];
    });
    return result;
  }

}

