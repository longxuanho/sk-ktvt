import { OpaqueToken } from "@angular/core";
import { AuthProviders, AuthMethods } from 'angularfire2';

export let APP_CONFIG = new OpaqueToken("app.config");

export enum LogMode {
  Simple = 0,
  Debug = 1,
  Disabled = 2
} 

export class AppConfig {

    // Database - Firebase
    'db.firebase': {
        apiKey: string,
        authDomain: string,
        databaseURL: string,
        storageBucket?: string,
        messagingSenderId?: string
    };
    'db.fbAuth': {
        provider: number,
        method: number
    };
    'db.fbApp': string;
    
    'db.fbRefUsers': string;
    'db.fbRefUserPresence': string;
    'db.fbRefUserProfiles': string;
    'db.fbRefAuthManagers': string;
    'db.fbRefThietbisList': string;

    // Database - GSheet
    'db.gSheetMaster': string;
    'db.gSheetRefId': string;
    'db.gSheetRefNhomThietBis': string;
    'db.gSheetRefChungLoaiThietBis': string;
    'db.gSheetRefLoaiThietBis': string;
    'db.gSheetRefHangSanXuats': string;
    'db.gSheetRefTrangThais': string;
    'db.gSheetRefKhuVucs': string;
    'db.gSheetRefDonVis': string;
    'db.gSheetRefModelThietBis': string;
    'db.gSheetRefNhaPhanPhois': string;

    // ElasticSearch
    'es.username': string;
    'es.password': string;
    'es.searchRef': string;
    'es.searchRefThietBi': string;

    // Logger
    'logger.mode': number;

    // Time
    'time.defaultDisplayFormat': string;
    'time.defaultExcelFileName': string;
    'time.customFullDate': string;
    'time.mTokenValidHours': number;

    // Thietbis
    'thietbis.itemPerPage': number;
    'thietbis.defaultSearchBy': string;
    'thietbis.defaultNhomFilterBy': string;

    // Statistics
    'statistics.numOfSearchBarMin': number;
    'statistics.numOfSearchBarMax': number;
}

export let appConfig: AppConfig = {
    
    // Database    
    'db.firebase': {
        apiKey: 'AIzaSyAF-2aWvlMVW48K1Vvovm5ARTcpQodgDsw',
        authDomain: 'sk-ktvt.firebaseapp.com',
        databaseURL: 'https://sk-ktvt.firebaseio.com',
        storageBucket: 'sk-ktvt.appspot.com',
        messagingSenderId: '366014972254'
    },
    'db.fbAuth': {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
    },
    'db.fbApp': 'sk-ktvt',

    'db.fbRefUsers': '/accounts/users',
    'db.fbRefUserPresence': '/accounts/userPresence',
    'db.fbRefUserProfiles': '/accounts/userProfiles',
    'db.fbRefAuthManagers': '/accounts/managers',
    'db.fbRefThietbisList': '/thietbis/list',

    // Database - GSheet
    'db.gSheetMaster': 'https://script.google.com/macros/s/AKfycbzUstOklUmuXrgvQAoETCDst3sDfE3d6Re22iXM9LWzTkPPHFQ/exec?id=',
    'db.gSheetRefId': '1HibGFj2wM_HMwSdgXK2IgK56aHuhOgW7VcmINbRi6ks',
    'db.gSheetRefNhomThietBis': '&sheet=nhomThietBis',
    'db.gSheetRefChungLoaiThietBis': '&sheet=chungLoaiThietBis',
    'db.gSheetRefLoaiThietBis': '&sheet=loaiThietBis',
    'db.gSheetRefHangSanXuats': '&sheet=hangSanXuats',
    'db.gSheetRefTrangThais': '&sheet=trangThais',
    'db.gSheetRefKhuVucs': '&sheet=khuVucs',
    'db.gSheetRefDonVis': '&sheet=donVis',
    'db.gSheetRefModelThietBis': '&sheet=modelThietBis',
    'db.gSheetRefNhaPhanPhois': '&sheet=nhaPhanPhois',

    // ElasticSearch
    'es.username': 'hsoyhafg',
    'es.password': 'd2mq1g5dfcfvnrmr',
    'es.searchRef': 'https://hsoyhafg:d2mq1g5dfcfvnrmr@maple-8497094.us-east-1.bonsaisearch.net/firebase',
    'es.searchRefThietBi': 'https://maple-8497094.us-east-1.bonsaisearch.net/firebase/thietbi/_search?timeout=3000ms',

    // Logger
    'logger.mode': LogMode.Debug,

    // Time
    'time.defaultDisplayFormat': 'YYYY-MM-DD HH:mm',
    'time.defaultExcelFileName': 'YYYY.MM.DD (HH.mm)',
    'time.customFullDate': 'dddd [, ngày] DD [tháng] MM [năm] YYYY',
    'time.mTokenValidHours': 8,

    // Thietbis
    'thietbis.itemPerPage': 6,
    'thietbis.defaultSearchBy': 'Mã thiết bị',
    'thietbis.defaultNhomFilterBy': '',

    // Statistics
    'statistics.numOfSearchBarMin': 0,
    'statistics.numOfSearchBarMax': 10,

};
