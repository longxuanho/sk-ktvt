import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LoggerService } from '../../core/shared/logger.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { ThietBi, RawThietBi } from '../../core/shared/thietbis.model';
import { ThietbisService } from '../../core/shared/thietbis.service';

declare var moment: any;

@Injectable()
export class ThietbisImportService {

  constructor(
    private http: Http,
    private loggerService: LoggerService,
    private thietbisService: ThietbisService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) { }

  getRawData() {
    let ref = '/assets/jsons/seed.json';

    return this.http.get(ref)
      .map((res: Response) => res.json());
  }

  resolveRawData(rawData: RawThietBi[]) {
    let result: ThietBi[];

    result = rawData.map(rawItem => this.resolveRawItem(rawItem));
    return result;
  }

  resolveRawItem(rawItem: RawThietBi) {
    let result: ThietBi = <ThietBi>{};
    result.maThietBi = rawItem.ma_thiet_bi.keyId;
    result.maMaximo = rawItem.ma_thiet_bi.maximo;
    result.maTopX = rawItem.ma_thiet_bi.topX;

    result.nhom = (rawItem.phan_loai.nhom !== 'Xe máy') ? rawItem.phan_loai.nhom : 'Xe - Máy';
    result.chungLoai = rawItem.phan_loai.chung_loai;
    result.loai = (rawItem.phan_loai.loai !== 'Xe nội bộ') ? rawItem.phan_loai.loai : 'Xe bus nội bộ';

    result.hangSanXuat = rawItem.nguon_goc.hang_san_xuat;
    result.modelThietBi = rawItem.nguon_goc.model;
    
    result.namSanXuat = rawItem.nguon_goc.nam_san_xuat;
    result.namSuDung = rawItem.ho_so.nam_su_dung;

    result.dvQuanLy = rawItem.phan_quyen.quan_ly.ten;
    result.dvQuanLyId = rawItem.phan_quyen.quan_ly.ma;
    result.dvSoHuu = rawItem.phan_quyen.so_huu.ten;
    result.dvSoHuuId = rawItem.phan_quyen.so_huu.ma;

    if (result.dvQuanLy == 'Xí nghiệp Cơ giới xếp dỡ Tân Cảng')
      result.dvQuanLy = 'Xí nghiệp Cơ giới xếp dỡ TC';
    if (result.dvSoHuu == 'Xí nghiệp Cơ giới xếp dỡ Tân Cảng')
      result.dvSoHuu = 'Xí nghiệp Cơ giới xếp dỡ TC';

    result.trangThai = rawItem.trang_thai;
    result.khuVuc = rawItem.dia_diem.khu_vuc.ten;
    result.khuVucId = rawItem.dia_diem.khu_vuc.ma;

    result.bienSo = rawItem.ho_so.bien_so;
    result.soDangKy = rawItem.ho_so.so_dang_ky;
    result.soKhung = rawItem.ho_so.so_khung;
    result.soMay = rawItem.ho_so.so_may;
    result.soDangKiem = rawItem.ho_so.so_dang_kiem;
    result.capChatLuong = rawItem.ho_so.cap_chat_luong;

    result.moTa = rawItem.mo_ta;
    result.ghiChu = rawItem.ghi_chu;

    result.createdAt = moment().format(this.appConfig['time.defaultDisplayFormat']);
    result.createdBy = '13vDprJSptWTq4EHxAuwRVM9RGu2';
    result.createdByEmail = 'longxuanho@gmail.com';

    Object.keys(result).forEach((key) => {
      if (result[key] === undefined)
        delete result[key];
    });
    return result;
  }

  seedData(preparedData: ThietBi[]) {
    preparedData.forEach((preparedItem, index) => {
      setTimeout(() => {
        this.thietbisService.addNew(preparedItem)
          .subscribe(
            isDone => console.info(`seeding index ${index} ok.`),
            error => console.error(`seeding error for index ${index}. Data: `, preparedItem));
      }, 5000);
    })
  }

}

