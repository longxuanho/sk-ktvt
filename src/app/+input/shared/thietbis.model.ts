export class ThietBi {
  maThietBi: string;
  maTopX?: string;
  maMaximo?: string;
  
  nhom: string;
  chungLoai: string;
  loai: string;

  hangSanXuat: string;
  modelThietBi?: string;
  nhaPhanPhoi?: string;

  namSanXuat?: number;
  namSuDung?: number;

  dvQuanLy: string;
  dvQuanLyId: string;
  dvSoHuu: string;
  dvSoHuuId: string;

  trangThai: string;
  khuVuc: string;
  khuVucId: string;

  bienSo?: string;
  soDangKy?: string;
  soKhung?: string;
  soMay?: string;
  soDangKiem?: string;
  capChatLuong?: number;

  moTa?: string;
  ghiChu?: string;
  
  createdAt: string;
  createdBy: string;
  createdByEmail: string;
  lastUpdatedAt?: string;
  lastUpdatedBy?: string;
  lastUpdatedByEmail?: string;
}

export class RawThietBi {
  _id: string;
  dia_diem: {
    khu_vuc: {
      ma: string;
      ten: string;
    }
  };
  ho_so: {
    bien_so: string;
    cap_chat_luong: number;
    nam_su_dung: number;
    so_dang_kiem: string;
    so_khung: string;
    xuat_xu: string;
    so_may: string;
    so_dang_ky: string;
  };
  ma_thiet_bi: {
    keyId: string;
    ref: string;
    topX: string;
    maximo: string
  };
  metadata: {
    thoi_gian: {
      tao_moi: {
        ngay_tao_string: string;
      }
    };
    user: {
      nguoi_tao: {
        email: string;
        keyId: string;
        name: string;
      }
    }
  };
  mo_ta: string;
  ghi_chu: string;
  nguon_goc: {
    hang_san_xuat: string;
    model: string;
    nam_san_xuat: number;
    noi_lap_rap: string;
    vendor: string;
  }
  phan_loai: {
    chung_loai: string;
    loai: string;
    nhom: string;
    scope: string;
  }
  phan_quyen: {
    quan_ly: {
      ma: string;
      ten: string;
    }
    so_huu: {
      ma: string;
      ten: string;
    }
  }
  trang_thai: string;
}
