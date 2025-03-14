import { BaseApi } from './base-api.ts';
import { HttpTransport } from '../rest/http-transport.ts';

export class ChatApi extends BaseApi {
    private _registerApi = new HttpTransport('https://ya-praktikum.tech/api/v2/');

    create(data: Record<string, string>) {
        return this._registerApi.post('chats', {
            data: data,
            headers: { credentials: 'include', 'Content-Type': 'application/json' }
        });
    }

    request() {
        return this._registerApi.get('chats', { headers: { credentials: 'include' } });
    }
}
