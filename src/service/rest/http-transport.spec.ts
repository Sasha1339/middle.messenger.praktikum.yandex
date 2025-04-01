import { expect } from 'chai';
import { HttpTransport, Options } from './http-transport.ts';
import { spy } from 'sinon';
import { METHODS } from './method.ts';

describe('HttpTransport', () => {
    let httpTransport: HttpTransport;

    beforeEach(() => {
        httpTransport = new HttpTransport();
    });

    it('should create query params for get', () => {
        const request = spy(httpTransport, 'request');
        const url = 'test';
        const options = { data: { data: 'test' } } as Options;

        void httpTransport.get(url, options);

        options.method = METHODS.GET;

        expect(request.calledWith('https://ya-praktikum.tech/api/v2/test', options)).to.be.true;
    });

    it('should create query params for put', () => {
        const request = spy(httpTransport, 'request');
        const url = 'test';
        const options = { data: { data: 'test' } } as Options;

        void httpTransport.put(url, options);

        options.method = METHODS.PUT;

        expect(request.calledWith('https://ya-praktikum.tech/api/v2/test', options)).to.be.true;
    });

    it('should create query params for post', () => {
        const request = spy(httpTransport, 'request');
        const url = 'test';
        const options = { data: { data: 'test' } } as Options;

        void httpTransport.post(url, options);

        options.method = METHODS.POST;

        expect(request.calledWith('https://ya-praktikum.tech/api/v2/test', options)).to.be.true;
    });

    it('should create query params for delete', () => {
        const request = spy(httpTransport, 'request');
        const url = 'test';
        const options = { data: { data: 'test' } } as Options;

        void httpTransport.delete(url, options);

        options.method = METHODS.DELETE;

        expect(request.calledWith('https://ya-praktikum.tech/api/v2/test', options)).to.be.true;
    });
});
