import { BaseApi } from './base-api.ts';
import { HttpTransport } from '../rest/http-transport.ts';

export class RegisterApi extends BaseApi {
    private _registerApi = new HttpTransport();

    create(data: Record<string, string>) {
        return this._registerApi.post('auth/signup', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });
    }
}
