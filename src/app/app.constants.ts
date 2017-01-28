import { OpaqueToken } from "@angular/core";

export let APP_CONST = new OpaqueToken("app.constants");

export class AppConstants {
    'validator.emailPattern': string
}

export var appConst: AppConstants = {
    'validator.emailPattern': "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
};
