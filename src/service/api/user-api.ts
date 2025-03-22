import { BaseApi } from './base-api.ts';
import { HttpTransport } from '../rest/http-transport.ts';

export class UserApi extends BaseApi {
    private _registerApi = new HttpTransport();

    request() {
        return this._registerApi.get('auth/user', {});
    }
}
