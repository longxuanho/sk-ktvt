import { OpaqueToken } from "@angular/core";
import { AuthProviders, AuthMethods } from 'angularfire2';

export let CORE_CONFIG = new OpaqueToken("core.config");

export class CoreConfig {
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
    'db.firebaseApp': string
}

export const coreConfig: CoreConfig = {
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
    'db.firebaseApp': 'sk-ktvt'
};
