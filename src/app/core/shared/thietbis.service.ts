import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AuthService } from '../../core/shared/auth.service';
import { ThietBi } from './thietbis.model';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

declare var moment: any;

@Injectable()
export class ThietbisService {

  constructor(
    private af: AngularFire,
    private authService: AuthService,
    private http: Http,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) { }

  resolveMetadataBeforeAddNew(rawData: ThietBi) {
    return this.authService.getAuth()
      .take(1)
      .switchMap(auth => {
        rawData.createdAt = moment().format(this.appConfig['time.defaultDisplayFormat']);
        rawData.createdBy = auth.uid;
        rawData.createdByEmail = auth.auth.email;
        return Observable.of(rawData);
      });
  }

  resolveMetadataBeforeUpdate(rawData: ThietBi) {
    return this.authService.getAuth()
      .take(1)
      .switchMap(auth => {
        rawData.lastUpdatedWhen = moment().format(this.appConfig['time.defaultDisplayFormat']);
        rawData.lastUpdatedBy = auth.uid;
        rawData.lastUpdatedByEmail = auth.auth.email;
        return Observable.of(rawData);
      });
  }

  resolveElasticSearchOptions(rawOptions: { page: number | string, nhom: string, search: string, searchBy: string }) {
    rawOptions.page = rawOptions.page ? +rawOptions.page : 1;
    rawOptions.nhom = rawOptions.nhom ? rawOptions.nhom : '';
    rawOptions.search = rawOptions.search ? rawOptions.search : '';
    rawOptions.searchBy = rawOptions.searchBy ? rawOptions.searchBy: this.appConfig['thietbis.defaultSearchBy'];

    let resultOptions = {
      "from": (rawOptions.page - 1) * this.appConfig['thietbis.itemPerPage'],
	    "size": this.appConfig['thietbis.itemPerPage'],
      "sort": { "maThietBi": { "order": "asc" } },
      "_source": ["maThietBi", "loai", "hangSanXuat", "namSanXuat", "dvQuanLy", "dvSoHuu", "khuVuc", "trangThai"]
    };

    if (rawOptions.search) {
      let queryString = { 
        "query": "*" + rawOptions.search + "*"
      }
      
      switch (rawOptions.searchBy) {
        case 'Biển số':
          queryString["fields"] = ['bienSo'];
          break;
        case 'Đơn vị quản lý':
          queryString["fields"] = ['dvQuanLy', 'dvQuanLyId'];
          break;
        case 'Đơn vị sở hữu':
          queryString["fields"] = ['dvSoHuu', 'dvSoHuuId'];
          break;
        case 'Ghi chú, mô tả':
          queryString["fields"] = ['ghiChu', 'moTa'];
          break;
        case 'Hãng sản xuất':
          queryString["fields"] = ['hangSanXuat'];
          break;
        case 'Nhà phân phối':
          queryString["fields"] = ['nhaPhanPhoi'];
          break;
        case 'Khu vực':
          queryString["fields"] = ['khuVuc', 'khuVucId'];
          break;
        case 'Loại thiết bị':
          queryString["fields"] = ['loai'];
          break;
        case 'Mã thiết bị':
          queryString["fields"] = ['maThietBi', 'maTopX', 'maMaximo'];
          break;
        case 'Model thiết bị':
          queryString["fields"] = ['modelThietBi'];
          break;
        case 'Năm sản xuất':
          queryString["fields"] = ['namSanXuat'];
          break;
        case 'Năm sử dụng':
          queryString["fields"] = ['namSuDung'];
          break;
        case 'Số đăng kiểm':
          queryString["fields"] = ['soDangKiem'];
          break;
        case 'Số đăng ký':
          queryString["fields"] = ['soDangKy'];
          break;
        case 'Số khung, số máy':
          queryString["fields"] = ['soKhung', 'soMay'];
          break;
        case 'Tags':
          queryString["fields"] = ['tags'];
          break;
        case 'Trạng thái':
          queryString["fields"] = ['trangThai'];
          break;
        default:
          queryString["fields"] = ['maThietBi', 'maTopX', 'maMaximo'];
          break;
      }

      if (rawOptions.nhom) {
        resultOptions["query"] = {
          "bool": {
            "must": {
              "query_string": queryString
            },
            "filter": [
              { "match_phrase": { "nhom": rawOptions.nhom } }
            ]
          }
        }
      } else {
        resultOptions["query"] = {
          "query_string": queryString
        };
      }

    } else {
      if (rawOptions.nhom) {
        resultOptions["query"] = {
          "bool": {
            "must": {
              "match_all": {}
            },
            "filter": [
              { "match_phrase": { "nhom": rawOptions.nhom } }
            ]
          }
        } 
      } else {
        resultOptions["query"] = { "match_all": {} }
      }
    }
    
    return resultOptions;
  }

  countThietBis() {
    let options = {
    }
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.appConfig['es.username'] + ":" + this.appConfig['es.password'])); 
    headers.append("Content-Type", "application/json");
    return this.http.post(this.appConfig['es.countRefThietBi'], options, { headers })
      .map((response: Response) => response.json());
  }

  getThietBis(queryParams) {

    let options = this.resolveElasticSearchOptions( Object.assign({}, queryParams) );

    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.appConfig['es.username'] + ":" + this.appConfig['es.password'])); 
    headers.append("Content-Type", "application/json");

    return this.http.post(this.appConfig['es.searchRefThietBi'], options, { headers })
      .map((response: Response) => response.json());
  }

  getAllThietBis() {
    return this.af.database.list(this.appConfig['db.fbRefThietbisList'])
      .take(1);
  }

  validateDataBeforeFetchToDataSource(thietbis: ThietBi[]) {
    // Dữ liệu thietbis tải về có thể gây lỗi cho grid khi group với trường có giá trị undefined.
    // Ta cần transform data trước khi fetch dữ liệu này cho datasource của grid.

    thietbis.forEach(thietbi => {
      thietbi.modelThietBi = thietbi.modelThietBi || '';
      thietbi.nhaPhanPhoi = thietbi.nhaPhanPhoi || '';
      thietbi.namSanXuat = thietbi.namSanXuat || null;
      thietbi.namSuDung = thietbi.namSuDung || null;
      thietbi.capChatLuong = thietbi.capChatLuong || null;
    });
    return thietbis;
  }

  getThietBi(thietbiId) {
    if (thietbiId)
      return this.af.database.object(`${ this.appConfig['db.fbRefThietbisList'] }/${ thietbiId }`);
    return Observable.of(null);
  }

  addNew(preparedData: ThietBi) {
    let done = new Subject<any>();
    let done$ = done.asObservable();
    
    this.af.database.list(this.appConfig['db.fbRefThietbisList'])
      .push(preparedData)
      .then(success => { done.next(success); done.complete(); })
      .catch(error => done.error(error));
    return done$;
  }

  update(thietbiId: string, preparedData: ThietBi) {
    if (thietbiId) {
      let done = new Subject<any>();
      let done$ = done.asObservable();

      this.af.database.object(`${ this.appConfig['db.fbRefThietbisList'] }/${ thietbiId }`)
        .update(preparedData)
        .then(success => { done.next(success); done.complete(); })
        .catch(error => done.error(error));

      return done$;
    }

    return Observable.throw(new Error('Id thiết bị không tồn tại'));
  }

  remove(thietbiId: string) {
    if (thietbiId) {
      let done = new Subject<any>();
      let done$ = done.asObservable();

      this.af.database.object(`${ this.appConfig['db.fbRefThietbisList'] }/${ thietbiId }`)
        .remove()
        .then(success => { done.next(success); done.complete(); })
        .catch(error => done.error(error));

      return done$;
    }

    return Observable.throw(new Error('Id thiết bị không tồn tại'));
  }
}
