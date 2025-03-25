import Block from '../../utils/block/block.ts';
import { expect } from 'chai';
import omit from '../../utils/utils/omit.ts';
import {restore, stub} from 'sinon';

describe('Register', () => {
    let appElement: HTMLElement | null;
    let mainComponent: Block;

    class Component extends Block {
        public override render(): string {
            return `<main id="main"></main>`;
        }
    }

    beforeEach(() => {
        appElement = document.getElementById('app') as HTMLElement;
        if (!appElement) {
            throw new Error('No app element found');
        }
        appElement.textContent = '';
        mainComponent = new Component({});
    });

    afterEach(() => {
        restore();
    });

    it('should init empty property', () => {
        expect(omit(mainComponent.props, ['__id'])).empty;
    });

    it('should be call method _makePropsProxy', () => {
        const fun = stub(mainComponent, '_makePropsProxy').returns({});
        expect(fun({ __id: '' })).eql({});
        //expect(fun.calledWith({ __id: match.any })).to.be.true;
        const result = mainComponent._makePropsProxy({});
        expect(fun.calledWith({})).to.be.true;
        expect(result).eql({});
    });
});
