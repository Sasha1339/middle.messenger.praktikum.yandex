import { BaseApi } from './base-api.ts';
import { HttpTransport } from '../rest/http-transport.ts';

export class HomeApi extends BaseApi {
    private _registerApi = new HttpTransport('https://ya-praktikum.tech/api/v2/');

    request() {
        return this._registerApi.get('chats', { headers: { credentials: 'include' } });
    }

    delete(data: Record<string, string>) {
        return this._registerApi.delete('chats', {
            headers: { credentials: 'include', 'Content-Type': 'application/json' },
            data: data
        });
    }
}
