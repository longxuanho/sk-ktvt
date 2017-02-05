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
      resultOptions["query"] = {
        "query_string": {
          "query": `*${rawOptions.search}*`,
          "fields": [rawOptions.searchBy]
        }
      };

      switch (rawOptions.searchBy) {
        case 'Biển số':
          resultOptions["query"].query_string.fields = ['bienSo'];
          break;
        case 'Đơn vị quản lý':
          resultOptions["query"].query_string.fields = ['dvQuanLy', 'dvQuanLyId'];
          break;
        case 'Đơn vị sở hữu':
          resultOptions["query"].query_string.fields = ['dvSoHuu', 'dvSoHuuId'];
          break;
        case 'Ghi chú, mô tả':
          resultOptions["query"].query_string.fields = ['ghiChu', 'moTa'];
          break;
        case 'Hãng sản xuất':
          resultOptions["query"].query_string.fields = ['hangSanXuat'];
          break;
        case 'Khu vực':
          resultOptions["query"].query_string.fields = ['khuVuc', 'khuVucId'];
          break;
        case 'Loại thiết bị':
          resultOptions["query"].query_string.fields = ['loai'];
          break;
        case 'Mã thiết bị':
          resultOptions["query"].query_string.fields = ['maThietBi', 'maTopX', 'maMaximo'];
          break;
        case 'Model thiết bị':
          resultOptions["query"].query_string.fields = ['modelThietBi'];
          break;
        case 'Năm sản xuất':
          resultOptions["query"].query_string.fields = ['namSanXuat'];
          break;
        case 'Năm sử dụng':
          resultOptions["query"].query_string.fields = ['namSuDung'];
          break;
        case 'Số đăng kiểm':
          resultOptions["query"].query_string.fields = ['soDangKiem'];
          break;
        case 'Số đăng ký':
          resultOptions["query"].query_string.fields = ['soDangKy'];
          break;
        case 'Số khung, số máy':
          resultOptions["query"].query_string.fields = ['soKhung', 'soMay'];
          break;
        case 'Tags':
          resultOptions["query"].query_string.fields = ['tags'];
          break;
        case 'Trạng thái':
          resultOptions["query"].query_string.fields = ['trangThai'];
          break;
        default:
          resultOptions["query"].query_string.fields = ['maThietBi', 'maTopX', 'maMaximo'];
          break;
      }
    }
    console.log('result options: ', resultOptions);
    return resultOptions;
  }

  getThietBis(queryParams) {

    let options = this.resolveElasticSearchOptions( Object.assign({}, queryParams) );

    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.appConfig['es.username'] + ":" + this.appConfig['es.password'])); 
    headers.append("Content-Type", "application/json");

    return this.http.post(this.appConfig['es.searchRefThietBi'], options, { headers })
      .map((response: Response) => response.json());
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
}
