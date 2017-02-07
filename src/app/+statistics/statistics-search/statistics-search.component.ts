import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Component({
  selector: 'sk-statistics-search',
  templateUrl: './statistics-search.component.html',
  styleUrls: ['./statistics-search.component.scss']
})
export class StatisticsSearchComponent implements OnInit {

  thietBiSearchForm: FormGroup;
  search: FormControl;

  routeSub: Subscription;
  searchSub: Subscription;

  currentPage: number = 1;
  searchText: string;
  searchBy: string;
  nhomFilterBy: string;

  searchByOptions = [
    'Biển số',
    'Đơn vị quản lý',
    'Đơn vị sở hữu',
    'Ghi chú, mô tả',
    'Hãng sản xuất',
    'Khu vực',
    'Loại thiết bị',
    'Mã thiết bị',
    'Model thiết bị',
    'Năm sản xuất',
    'Năm sử dụng',
    'Số đăng kiểm',
    'Số đăng ký',
    'Số khung, số máy',
    'Tags',
    'Trạng thái'
    ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {
    this.buildForm();
  }

  buildForm() {
    this.search = this.formBuilder.control('');
    this.thietBiSearchForm = this.formBuilder.group({ 
      search: this.search
    });
  }

  subscribeFormChanges() {

  }

  ngOnInit() {
    this.subscribeFormChanges();

    this.routeSub = this.route.queryParams
      .subscribe(params => {
        if (params['search'])
          this.search.setValue(params['search']);
        this.currentPage = +params['page'] || 1;
        this.searchText = params['search'] || '';
        this.searchBy = params['searchBy'] || this.appConfig['thietbis.defaultSearchBy'];
        this.nhomFilterBy = params['nhom'] || this.appConfig['thietbis.defaultNhomFilterBy'];
      });
  }

  ngOnDestroy() {
    if (this.searchSub)
      this.searchSub.unsubscribe();
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

}
