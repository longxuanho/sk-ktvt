import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { LoggerService } from '../../core/shared/logger.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThietbisHelpersService {

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: Http,
    private loggerService: LoggerService
  ) { }

  getNhoms() {
    let ref = this.appConfig['db.gSheetMaster'] + this.appConfig['db.gSheetRefId'] + this.appConfig['db.gSheetRefNhomThietBis'];

    return this.http.get(ref)
      .map((res: Response) => res.json()['nhomThietBis'])
      .map(nhomThietBis => nhomThietBis.map(nhomThietBiObj => nhomThietBiObj.nhomThietBi))
  }

  getChungLoais() {
    let ref = this.appConfig['db.gSheetMaster'] + this.appConfig['db.gSheetRefId'] + this.appConfig['db.gSheetRefChungLoaiThietBis'];

    return this.http.get(ref)
      .map((res: Response) => res.json()['chungLoaiThietBis'])
      .map(chungLoaiThietBis => {
        return chungLoaiThietBis.reduce((result, chungLoaiThietBiObj) => {
          (result[chungLoaiThietBiObj.nhomThietBi] = result[chungLoaiThietBiObj.nhomThietBi] || [])
            .push(chungLoaiThietBiObj.chungLoaiThietBi);
          return result;
        }, {});
      });
  }

  getLoais() {
    let ref = this.appConfig['db.gSheetMaster'] + this.appConfig['db.gSheetRefId'] + this.appConfig['db.gSheetRefLoaiThietBis'];

    return this.http.get(ref)
      .map((res: Response) => res.json()['loaiThietBis'])
      .map(loaiThietBis => {
        return loaiThietBis.reduce((result, loaiThietBiObj) => {
          (result[loaiThietBiObj.chungLoai] = result[loaiThietBiObj.chungLoai] || [])
            .push(loaiThietBiObj.loai);
          return result;
        }, {})
      });
  }

  getHangSanXuats() {
    let ref = this.appConfig['db.gSheetMaster'] + this.appConfig['db.gSheetRefId'] + this.appConfig['db.gSheetRefHangSanXuats'];

    return this.http.get(ref)
      .map((res: Response) => res.json()['hangSanXuats'])
      .map(hangSanXuats => hangSanXuats.map(hangSanXuatObj => hangSanXuatObj.hangSanXuat));
  }

  getModelThietBis() {
    let ref = this.appConfig['db.gSheetMaster'] + this.appConfig['db.gSheetRefId'] + this.appConfig['db.gSheetRefModelThietBis'];

    return this.http.get(ref)
      .map((res: Response) => res.json()['modelThietBis'])
      .map(modelThietBis => {
        return modelThietBis.reduce((result, modelThietBiObj) => {
          (result[modelThietBiObj.hangSanXuat] = result[modelThietBiObj.hangSanXuat] || [])
            .push(modelThietBiObj.modelThietBi);
          return result;
        }, {});
      });
  }

  getDonVis() {
    let ref = this.appConfig['db.gSheetMaster'] + this.appConfig['db.gSheetRefId'] + this.appConfig['db.gSheetRefDonVis'];

    return this.http.get(ref)
      .map((res: Response) => res.json()['donVis']);
  }

  getTrangThais() {
    let ref = this.appConfig['db.gSheetMaster'] + this.appConfig['db.gSheetRefId'] + this.appConfig['db.gSheetRefTrangThais'];

    return this.http.get(ref)
      .map((res: Response) => res.json()['trangThais'])
      .map(trangThais => trangThais.map(trangThaiObj => trangThaiObj.trangThai));
  }

  getKhuVucs() {
    let ref = this.appConfig['db.gSheetMaster'] + this.appConfig['db.gSheetRefId'] + this.appConfig['db.gSheetRefKhuVucs'];

    return this.http.get(ref)
      .map((res: Response) => res.json()['khuVucs']);
  }
}
