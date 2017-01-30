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
    'db.firebaseAuth': {
        provider: number,
        method: number
    };
    'db.firebaseApp': string;
    'db.firebaseApi': {
        'users': string,
        'userPresence': string,
        'userProfiles': string,
        'managers': string
    };

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

    // Logger
    'logger.mode': number
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
    'db.firebaseAuth': {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
    },
    'db.firebaseApp': 'sk-ktvt',
    'db.firebaseApi': {
        'users': '/accounts/users',
        'userPresence': '/accounts/userPresence',
        'userProfiles': '/accounts/userProfiles',
        'managers': '/accounts/managers'
    },

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

    // Logger
    'logger.mode': LogMode.Debug 
};
