import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Component({
  selector: 'sk-thietbis-search',
  templateUrl: './thietbis-search.component.html',
  styleUrls: ['./thietbis-search.component.scss']
})
export class ThietbisSearchComponent implements OnInit, OnDestroy {

  @Input() routeName: string;
  thietBiSearchForm: FormGroup;
  search: FormControl;
  
  routeSub: Subscription;
  searchSub: Subscription;

  currentPage: number = 1;
  lastSearchText: string;
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
  nhomFilterByOptions = [
    'Thiết bị nâng',
    'Xe - Máy',
    'Tàu thuyền',
    'Trạm nguồn',
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

  // Cập nhật url khi searchText thay đổi
  subscribeFormChanges() {
    this.searchSub = this.search.valueChanges
      .debounceTime(1000)
      .subscribe(newVal => {
        this.searchText = newVal;

        // Nếu người dùng search một từ khóa mới -> reset page về 1
        if (this.lastSearchText !== newVal)
          this.currentPage = 1;
        let queryParams = this.resolveQueryParams();
        this.router.navigate([this.routeName], { queryParams });
      });
  }

  resolveQueryParams() {
    let queryParams = {
      searchBy: this.searchBy
    };
    if (this.currentPage)
      queryParams['page'] = this.currentPage;
    if (this.searchText)
      queryParams['search'] = this.searchText;
    if (this.nhomFilterBy)
      queryParams['nhom'] = this.nhomFilterBy;
      
    return queryParams;
  }

  setSearchBy(event: Event, searchByOption: string) {
    event.preventDefault();
    this.searchBy = searchByOption;
    let queryParams = this.resolveQueryParams();
    this.router.navigate([this.routeName], { queryParams });
  }

  setNhomFilterBy(event: Event, nhomFilterByOption: string) {
    event.preventDefault();
    this.nhomFilterBy = nhomFilterByOption;
    let queryParams = this.resolveQueryParams();
    this.router.navigate([this.routeName], { queryParams });
  }

  ngOnInit() {
    this.subscribeFormChanges();
    
    this.routeSub = this.route.queryParams
      .subscribe(params => {
        this.lastSearchText = params['search'] || '';
        this.search.setValue(this.lastSearchText);

        this.currentPage = +params['page'] || 1;
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
