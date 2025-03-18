import { BaseApi } from './base-api.ts';
import { HttpTransport } from '../rest/http-transport.ts';

export class ProfileApi extends BaseApi {
    private _registerApi = new HttpTransport('https://ya-praktikum.tech/api/v2/');

    updateProfile(data: Record<string, string>) {
        return this._registerApi.put('user/profile', {
            headers: { credentials: 'include', 'Content-Type': 'application/json' },
            data: data
        });
    }

    updatePassword(data: Record<string, string>) {
        return this._registerApi.put('user/password', {
            headers: { credentials: 'include', 'Content-Type': 'application/json' },
            data: data
        });
    }

    updateAvatar(data: FormData) {
        return this._registerApi.put('user/profile/avatar', {
            headers: { credentials: 'include' },
            data: data
        });
    }
}
