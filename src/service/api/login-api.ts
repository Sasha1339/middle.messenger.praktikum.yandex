import { BaseApi } from './base-api.ts';
import { HttpTransport } from '../rest/http-transport.ts';

export class LoginApi extends BaseApi {
    private _registerApi = new HttpTransport();

    create(data: Record<string, string>) {
        return this._registerApi.post('auth/signin', {
            headers: {
                credentials: 'include',
                'Content-Type': 'application/json'
            },
            data: data
        });
    }

    logout() {
        return this._registerApi.post('auth/logout', {});
    }
}
