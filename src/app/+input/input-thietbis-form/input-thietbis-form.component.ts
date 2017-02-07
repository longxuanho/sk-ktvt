import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { ThietBi } from '../../core/shared/thietbis.model';
import { ThietbisService } from '../../core/shared/thietbis.service';
import { ThietbisHelpersService } from '../shared/thietbis-helpers.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-input-thietbis-form',
  templateUrl: './input-thietbis-form.component.html',
  styleUrls: ['./input-thietbis-form.component.scss']
})
export class InputThietbisFormComponent implements OnInit, OnDestroy {

  @Input() mode: string;
  @Output() onSubmited = new EventEmitter<ThietBi>();
  @Output() onRemoved = new EventEmitter<ThietBi>();

  selectedThietBi: ThietBi;
  
  thietbiForm: FormGroup;
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
  removing: boolean = false;

  partialLockPhanLoai = false;
  partialLockNguonGoc = false;
  partialLockPhanQuyen = false;
  partialLockKhuVuc = false;

  constructor(
    private formBuilder: FormBuilder,
    private thietBisService: ThietbisService,
    private thietbisHelpersService: ThietbisHelpersService
  ) { 
    this.buildForm();
  }

  buildForm() {
    this.maThietBi = this.formBuilder.control(null, [Validators.required]);
    this.maTopX = this.formBuilder.control(null);
    this.maMaximo = this.formBuilder.control(null);

    this.nhom = this.formBuilder.control(null, [Validators.required]);
    this.chungLoai = this.formBuilder.control(null, [Validators.required]);
    this.loai = this.formBuilder.control(null, [Validators.required]);

    this.hangSanXuat = this.formBuilder.control(null, [Validators.required]);
    this.modelThietBi = this.formBuilder.control(null);
    this.nhaPhanPhoi = this.formBuilder.control(null);
    this.namSanXuat = this.formBuilder.control(null);
    this.namSuDung = this.formBuilder.control(null);

    this.dvQuanLy = this.formBuilder.control(null, [Validators.required]);
    this.dvQuanLyId = this.formBuilder.control(null, [Validators.required]);
    this.dvSoHuu = this.formBuilder.control(null, [Validators.required]);
    this.dvSoHuuId = this.formBuilder.control(null, [Validators.required]);

    this.trangThai = this.formBuilder.control(null, [Validators.required]);
    this.khuVuc = this.formBuilder.control(null, [Validators.required]);
    this.khuVucId = this.formBuilder.control(null, [Validators.required]);

    this.bienSo = this.formBuilder.control(null);
    this.soDangKy = this.formBuilder.control(null);
    this.soKhung = this.formBuilder.control(null);
    this.soMay = this.formBuilder.control(null);
    this.soDangKiem = this.formBuilder.control(null);
    this.capChatLuong = this.formBuilder.control(null);
    
    this.moTa = this.formBuilder.control(null);
    this.ghiChu = this.formBuilder.control(null);

    this.thietbiForm = this.formBuilder.group({ 
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
        let dvQuanLyId = foundResult.donViId || null;
        this.dvQuanLyId.setValue(dvQuanLyId);
      });
    this.dvSoHuuSub = this.dvSoHuu.valueChanges
      .subscribe(newVal => {
        let foundResult = this.selectOptions.donVis
          .find(donViObj => donViObj.donVi === newVal)  || {};
        let dvSoHuuId = foundResult.donViId || null;
        this.dvSoHuuId.setValue(dvSoHuuId);
      });
    this.khuVucSub = this.khuVuc.valueChanges
      .subscribe(newVal => {
        let foundResult = this.selectOptions.khuVucs
          .find(khuVucObj => khuVucObj.khuVuc === newVal)  || {};
        let khuVucId = foundResult.khuVucId || null;
        this.khuVucId.setValue(khuVucId);
      })
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

  onReset(selectedThietBi?: ThietBi) {
    if (this.mode === 'addNew')
      this.resetAsNewForm();
    if (this.mode === 'update')
      this.resetAsDetailForm(selectedThietBi);
  }

  onSubmit(rawData: ThietBi) {
    this.submitting = true;
    this.onSubmited.emit(rawData);
  }

  onRemove() {
    this.submitting = true;
    this.onRemoved.emit();
  }

  resetAsNewForm() {
    let resetControls: FormControl[] = [
      this.maThietBi, this.maMaximo, this.maTopX,
      this.bienSo, this.soDangKy, this.soKhung, this.soMay, this.soDangKiem, this.capChatLuong,
      this.ghiChu, this.moTa
    ];
    
    if (!this.partialLockPhanLoai)
      resetControls.push(...[ this.nhom, this.chungLoai, this.loai ]);
    if (!this.partialLockNguonGoc)
      resetControls.push(...[ this.hangSanXuat, this.modelThietBi, this.nhaPhanPhoi, this.namSanXuat, this.namSuDung ]);
    if (!this.partialLockPhanQuyen)
      resetControls.push(...[ this.dvQuanLy, this.dvSoHuu ]);
    if (!this.partialLockKhuVuc)
      resetControls.push(...[ this.khuVuc ]);
    
    resetControls.forEach(control => control.reset());
    this.trangThai.setValue('Đang hoạt động');
  }

  resetAsDetailForm(selectedThietBi: ThietBi) {
    this.thietbiForm.reset();
    if (selectedThietBi) {  // it means that its parent component send reset command with data
      this.selectedThietBi = selectedThietBi;   // save that data first
      this.thietbiForm.patchValue(selectedThietBi);
      this.chungLoai.setValue(selectedThietBi.chungLoai);
      this.loai.setValue(selectedThietBi.loai);      
    } else {
      if (this.selectedThietBi) { // it means that user click reset button
        this.thietbiForm.patchValue(this.selectedThietBi);
        this.chungLoai.setValue(this.selectedThietBi.chungLoai);
        this.loai.setValue(this.selectedThietBi.loai);
      }
    }
  }

  ngOnInit() {
    this.resolveSelectOptions();
    this.subscribeFormChanges();
    this.onReset();
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
