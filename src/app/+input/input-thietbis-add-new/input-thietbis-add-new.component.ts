import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { LoggerService } from '../../core/shared/logger.service';
import { AuthService } from '../../core/shared/auth.service';
import { ThietBi } from '../shared/thietbis.model';
import { ThietbisService } from '../shared/thietbis.service';
import { ThietbisHelpersService } from '../shared/thietbis-helpers.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'sk-input-thietbis-add-new',
  templateUrl: './input-thietbis-add-new.component.html',
  styleUrls: ['./input-thietbis-add-new.component.scss']
})
export class InputThietbisAddNewComponent implements OnInit, OnDestroy {

  thietBiAddNewForm: FormGroup;
  maThietBi: FormControl;
  maTopX: FormControl;  
  maMaximo: FormControl;
  nhom: FormControl;
  chungLoai: FormControl;
  loai: FormControl;
  hangSanXuat: FormControl;
  modelThietBi: FormControl;
  nhaPhanPhoi: FormControl;
  namSanXuat: FormControl;
  namSuDung: FormControl;
  dvQuanLy: FormControl;
  dvQuanLyId: FormControl;
  dvSoHuu: FormControl;
  dvSoHuuId: FormControl;
  trangThai: FormControl;
  khuVuc: FormControl;
  khuVucId: FormControl;
  bienSo: FormControl;
  soDangKy: FormControl;
  soKhung: FormControl;
  soMay: FormControl;
  soDangKiem: FormControl;
  capChatLuong: FormControl;
  moTa: FormControl;
  ghiChu: FormControl;

  nhomSub: Subscription;
  chungLoaiSub: Subscription;
  hangSanXuatSub: Subscription;
  dvQuanLySub: Subscription;
  dvSoHuuSub: Subscription;
  khuVucSub: Subscription;

  selectOptions = {
    nhoms: [],
    chungLoais: {},
    loais: {},
    hangSanXuats: [],
    modelThietBis: {},
    nhaPhanPhois: [],
    donVis: [],
    trangThais: [],
    khuVucs: []
  }
  
  submitting: boolean = false;

  

  constructor(
    private formBuilder: FormBuilder,
    private loggerService: LoggerService,
    private authService: AuthService,
    private thietBisService: ThietbisService,
    private thietbisHelpersService: ThietbisHelpersService
  ) { 
    this.buildForm();
  }

  buildForm() {
    this.maThietBi = this.formBuilder.control('', [Validators.required]);
    this.maTopX = this.formBuilder.control('');
    this.maMaximo = this.formBuilder.control('');

    this.nhom = this.formBuilder.control('', [Validators.required]);
    this.chungLoai = this.formBuilder.control('', [Validators.required]);
    this.loai = this.formBuilder.control('', [Validators.required]);

    this.hangSanXuat = this.formBuilder.control('', [Validators.required]);
    this.modelThietBi = this.formBuilder.control('');
    this.nhaPhanPhoi = this.formBuilder.control('');
    this.namSanXuat = this.formBuilder.control('');
    this.namSuDung = this.formBuilder.control('');

    this.dvQuanLy = this.formBuilder.control('', [Validators.required]);
    this.dvQuanLyId = this.formBuilder.control('', [Validators.required]);
    this.dvSoHuu = this.formBuilder.control('', [Validators.required]);
    this.dvSoHuuId = this.formBuilder.control('', [Validators.required]);

    this.trangThai = this.formBuilder.control('Đang hoạt động', [Validators.required]);
    this.khuVuc = this.formBuilder.control('', [Validators.required]);
    this.khuVucId = this.formBuilder.control('', [Validators.required]);

    this.bienSo = this.formBuilder.control('');
    this.soDangKy = this.formBuilder.control('');
    this.soKhung = this.formBuilder.control('');
    this.soMay = this.formBuilder.control('');
    this.soDangKiem = this.formBuilder.control('');
    this.capChatLuong = this.formBuilder.control('');
    
    this.moTa = this.formBuilder.control('');
    this.ghiChu = this.formBuilder.control('');

    this.thietBiAddNewForm = this.formBuilder.group({ 
      maThietBi: this.maThietBi, 
      maMaximo: this.maMaximo, 
      maTopX: this.maTopX,

      nhom: this.nhom,
      chungLoai: this.chungLoai,
      loai: this.loai,

      hangSanXuat: this.hangSanXuat,
      modelThietBi: this.modelThietBi,
      nhaPhanPhoi: this.nhaPhanPhoi,
      namSanXuat: this.namSanXuat,
      namSuDung: this.namSuDung,

      dvQuanLy: this.dvQuanLy,
      dvQuanLyId: this.dvQuanLyId,
      dvSoHuu: this.dvSoHuu,
      dvSoHuuId: this.dvSoHuuId,

      trangThai: this.trangThai,
      khuVuc: this.khuVuc,
      khuVucId: this.khuVucId,

      bienSo: this.bienSo,
      soDangKy: this.soDangKy,
      soKhung: this.soKhung,
      soMay: this.soMay,
      soDangKiem: this.soDangKiem,
      capChatLuong: this.capChatLuong,

      moTa: this.moTa,
      ghiChu: this.ghiChu
    });
  }

  subscribeFormChanges() {
    this.nhomSub = this.nhom.valueChanges
      .subscribe(newVal => {
        this.chungLoai.reset();
        this.loai.reset();
      });
    this.chungLoaiSub = this.chungLoai.valueChanges
      .subscribe(newVal => {
        this.loai.reset();
      });
    this.hangSanXuatSub = this.hangSanXuat.valueChanges
      .subscribe(newVal => {
        this.modelThietBi.reset();
      });
    this.dvQuanLySub = this.dvQuanLy.valueChanges
      .subscribe(newVal => {
        let foundResult = this.selectOptions.donVis
          .find(dvObject => dvObject.donVi === newVal)  || {};
        let dvQuanLyId = foundResult.donViId || '';
        this.dvQuanLyId.setValue(dvQuanLyId);
      });
    this.dvSoHuuSub = this.dvSoHuu.valueChanges
      .subscribe(newVal => {
        let foundResult = this.selectOptions.donVis
          .find(donViObj => donViObj.donVi === newVal)  || {};
        let dvSoHuuId = foundResult.donViId || '';
        this.dvSoHuuId.setValue(dvSoHuuId);
      });
    this.khuVucSub = this.khuVuc.valueChanges
      .subscribe(newVal => {
        let foundResult = this.selectOptions.khuVucs
          .find(khuVucObj => khuVucObj.khuVuc === newVal)  || {};
        let khuVucId = foundResult.khuVucId || '';
        this.khuVucId.setValue(khuVucId);
      })
  }

  onReset() {
    console.log(this.selectOptions)
  }

  onSubmit(rawData: ThietBi) {
    
    this.thietBisService.resolveMetadataBeforeAddNew(rawData)
      .switchMap(preparedData =>
        this.thietBisService.addNew(preparedData))
      .subscribe(
        success => this.loggerService.success('Thiết bị mới đã được thêm vào hệ thống', 'Tạo mới thành công', success),
        error => this.loggerService.error(error.message, 'Tạo mới thất bại', error)
      );
  }

  resolveSelectOptions() {
    this.thietbisHelpersService.getNhoms()
      .subscribe(
        nhoms => this.selectOptions.nhoms = nhoms,
        error => this.handleError(error));
    this.thietbisHelpersService.getChungLoais()
      .subscribe(
        chungloais => this.selectOptions.chungLoais = chungloais,
        error => this.handleError(error));
    this.thietbisHelpersService.getLoais()
      .subscribe(
        loais => this.selectOptions.loais = loais,
        error => this.handleError(error));
    this.thietbisHelpersService.getHangSanXuats()
      .subscribe(
        hangSanXuats => this.selectOptions.hangSanXuats = hangSanXuats,
        error => this.handleError(error));
    this.thietbisHelpersService.getModelThietBis()
      .subscribe(
        modelThietBis => this.selectOptions.modelThietBis = modelThietBis,
        error => this.handleError(error));
    this.thietbisHelpersService.getNhaPhanPhois()
      .subscribe(
        nhaPhanPhois => this.selectOptions.nhaPhanPhois = nhaPhanPhois,
        error => this.handleError(error));
    this.thietbisHelpersService.getDonVis()
      .subscribe(
        donVis => this.selectOptions.donVis = donVis,
        error => this.handleError(error));
    this.thietbisHelpersService.getTrangThais()
      .subscribe(
        trangThais => this.selectOptions.trangThais = trangThais,
        error => this.handleError(error));
    this.thietbisHelpersService.getKhuVucs()
      .subscribe(
        khuVucs => this.selectOptions.khuVucs = khuVucs,
        error => this.handleError(error));
  }

  handleError(error) {
    console.error('Truy vấn dữ liệu từ GSheet thất bại. Chi tiết:', error);
  }

  ngOnInit() {
    this.resolveSelectOptions();
    this.subscribeFormChanges();    
  }

  ngOnDestroy() {
    if (this.nhomSub)
      this.nhomSub.unsubscribe();
    if (this.chungLoaiSub)
      this.chungLoaiSub.unsubscribe();
    if (this.hangSanXuatSub)
      this.hangSanXuatSub.unsubscribe();
    if (this.dvQuanLySub)
      this.dvQuanLySub.unsubscribe();
    if (this.dvSoHuuSub)
      this.dvSoHuuSub.unsubscribe();
    if (this.khuVucSub)
      this.khuVucSub.unsubscribe();
  }

}
