import { METHODS } from './method.ts';

interface Options {
    timeout?: number;
    headers?: Record<string, string>;
    method?: METHODS;
    data?: Record<string, unknown> | FormData;
    cookies?: boolean;
}

function queryStringify(data: Record<string, unknown>) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys: string[] = Object.keys(data);
    return keys.reduce((result, key, index): string => {
        return `${result}${key}=${data[key] as string}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

export class HttpTransport {
    private _api: string;

    constructor(api: string) {
        this._api = api;
    }

    get = (url: string, options: Options) => {
        return this.request(this._api + url, { ...options, method: METHODS.GET });
    };

    post = (url: string, options: Options) => {
        return this.request(this._api + url, { ...options, method: METHODS.POST }, options.timeout);
    };

    put = (url: string, options: Options) => {
        return this.request(this._api + url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    delete = (url: string, options: Options) => {
        return this.request(this._api + url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    request = (url: string, options: Options, timeout = 5000) => {
        const { headers = {}, method, data } = options;

        return new Promise<XMLHttpRequest>(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(method, isGet && !!data && !(data instanceof FormData) ? `${url}${queryStringify(data)}` : url);

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.withCredentials = true;

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (data instanceof FormData) {
                xhr.send(data);
            } else {
                if (isGet || !data) {
                    xhr.send();
                } else {
                    xhr.send(JSON.stringify(data));
                }
            }
        });
    };
}
