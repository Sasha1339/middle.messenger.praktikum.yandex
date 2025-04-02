import { expect } from 'chai';
import { Route } from './route.ts';
import Block from '../block/block.ts';

describe('Route', () => {
    let route: Route<Block>;

    class Component extends Block {
        public override render(): string {
            return `<main id="main"></main>`;
        }
    }

    beforeEach(() => {
        route = new Route('/test', Component, { rootQuery: '#app' });
    });

    afterEach(() => {
        const element = document.querySelector('#main') as HTMLElement;
        if (element) {
            element.remove();
        }
    });

    it('should navigate on route', () => {
        route.navigate('/test');

        const element = document.querySelector('#main') as HTMLElement;

        expect(element.style.display).to.eql('');
    });

    it('should render route', () => {
        route.render();

        const element = document.querySelector('#main') as HTMLElement;

        expect(element.style.display).to.eql('');
    });

    it('should hide route', () => {
        route.navigate('/test');
        route.leave();

        const element = document.querySelector('#main') as HTMLElement;

        expect(element.style.display).to.eql('none');
    });

    it('should match route', () => {
        expect(route.match('/test')).to.be.true;
    });
});
