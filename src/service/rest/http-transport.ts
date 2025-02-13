import { METHODS } from './method.ts';

interface Options {
  timeout?: number;
  headers: Record<string, string>;
  method: METHODS;
  data: Record<string, string>;
}

function queryStringify(data: Record<string, string>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys: string[] = Object.keys(data);
  return keys.reduce((result, key, index): string => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HttpTransport {
  get = (url: string, options: Options) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post = (url: string, options: Options) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put = (url: string, options: Options) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete = (url: string, options: Options) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (url: string, options: Options) => {
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = options.timeout ?? 5000;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
