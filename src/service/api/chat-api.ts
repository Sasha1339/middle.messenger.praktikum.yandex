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

    getToken(chatId: number) {
        return this._registerApi.post(`chats/token/${chatId}`, { headers: { credentials: 'include' } });
    }

    updateCountMessage(chatId: number) {
        return this._registerApi.get(`chats/new/${chatId}`, { headers: { credentials: 'include' } });
    }

    getUsers(chatId: string) {
        return this._registerApi.get(`chats/${chatId}/users`, { headers: { credentials: 'include' } });
    }

    addUsers(chatId: number, userId: number) {
        return this._registerApi.put(`chats/users`, {
            data: { users: [userId], chatId: chatId },
            headers: { credentials: 'include', 'Content-Type': 'application/json' }
        });
    }

    deleteUsers(chatId: number, userId: number) {
        return this._registerApi.delete(`chats/users`, {
            data: { users: [userId], chatId: chatId },
            headers: { credentials: 'include', 'Content-Type': 'application/json' }
        });
    }
}
