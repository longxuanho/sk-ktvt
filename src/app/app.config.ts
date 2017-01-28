import { OpaqueToken } from "@angular/core";
import { AuthProviders, AuthMethods } from 'angularfire2';

export let APP_CONFIG = new OpaqueToken("app.config");

export enum LogMode {
  Simple = 0,
  Debug = 1,
  Disabled = 2
} 

export class AppConfig {

    // Database

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

    // Logger

    'logger.mode': LogMode.Debug 
};
