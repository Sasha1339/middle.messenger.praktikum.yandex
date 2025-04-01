import { expect } from 'chai';
import { Router } from './router.ts';
import Block from '../block/block.ts';

describe('Router', () => {
    let router: Router;

    class Component extends Block {
        public override render(): string {
            return `<main id="main"><span>{{ text }}</span></main>`;
        }
    }

    class Component2 extends Block {
        public override render(): string {
            return `<main id="main"><span>{{ text }}</span></main>`;
        }
    }

    beforeEach(() => {
        router = new Router('#app');
    });

    it('should added new route', () => {
        router.use('/test', Component);

        expect(router.getRoute('/test')).to.not.be.undefined;
    });

    it('should route on /', () => {
        router.start();

        expect(window.location.pathname).to.equal('/');
    });

    it('should route on /test', () => {
        router.use('/test', Component);

        router.start();

        router.go('/test');

        expect(window.location.pathname).to.equal('/test');
    });

    it('should back route on /test', (done) => {
        router.use('/test', Component);
        router.use('/test2', Component2);

        router.start();

        router.go('/test');
        router.go('/test2');
        router.back();
        setTimeout(() => {
            expect(window.location.pathname).to.equal('/test');
            done();
        }, 50);
    });

    it('should forward route on /test2', (done) => {
        router.use('/test', Component);
        router.use('/test2', Component2);

        router.start();

        router.go('/test');
        router.go('/test2');
        router.back();
        setTimeout(() => {
            router.forward();
            setTimeout(() => {
                expect(window.location.pathname).to.equal('/test2');
                done();
            }, 50);
        }, 50);
    });
});
