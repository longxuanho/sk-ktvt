import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { LoggerService } from '../../core/shared/logger.service';
import { AuthService } from '../../core/shared/auth.service';
import { ThietBi } from '../shared/thietbis.model';


@Component({
  selector: 'sk-input-thietbis-add-new',
  templateUrl: './input-thietbis-add-new.component.html',
  styleUrls: ['./input-thietbis-add-new.component.scss']
})
export class InputThietbisAddNewComponent implements OnInit {

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
  
  submitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
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

  resetForm() {

  }

  ngOnInit() {
  }

}
