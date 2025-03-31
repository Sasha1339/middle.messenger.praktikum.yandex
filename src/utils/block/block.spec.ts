import Block from './block.ts';
import { expect } from 'chai';
import omit from '../utils/omit.ts';
import { restore, spy, stub } from 'sinon';

describe('Block', () => {
    let appElement: HTMLElement | null;

    class Component extends Block {
        public override render(): string {
            return `<main id="main"><span>{{ text }}</span><div>{{{ Children }}}</div></main>`;
        }
    }

    class ChildrenComponent extends Block {
        public override render(): string {
            return `<article id="main">{{text}}</article>`;
        }
    }

    beforeEach(() => {
        appElement = document.getElementById('app') as HTMLElement;
        if (!appElement) {
            throw new Error('No app element found');
        }
        appElement.textContent = '';
    });

    afterEach(() => {
        restore();
    });

    it('should init empty property', () => {
        const component = new Component({});
        expect(omit(component.props, ['__id'])).empty;
    });

    it('should set text value', () => {
        const text = 'Hello World';

        const component = new Component({ text });

        const elementText = component.element.querySelector('span')?.textContent;

        expect(elementText).to.eq(text);
    });

    it('should set new value', () => {
        const newValue = 'New Hello World';

        const component = new Component({ text: 'Hello World' });

        component.setProps({ text: newValue });

        const elementText = component.element.querySelector('span')?.textContent;

        expect(elementText).to.eq(newValue);
    });

    it('should invoke isLoaded when created component', () => {
        const spyMethod = spy(Component.prototype, 'isLoaded');

        new Component();

        expect(spyMethod.calledOnce).to.be.true;

        spyMethod.restore();
    });

    it('should not invoke isLoaded when added new props', () => {
        const newValue = 'New Hello World';
        const component = new Component({ text: 'Hello World' });

        const fun = stub(component, 'isLoaded').returns();
        component.setProps({ text: newValue });
        expect(fun.calledOnce).to.be.false;
    });

    it('should invoke init', () => {
        const spyMethod = spy(Component.prototype, 'init');

        new Component();

        expect(spyMethod.calledOnce).to.be.true;

        spyMethod.restore();
    });

    it('should invoke render when created component', () => {
        const spyMethod = spy(Component.prototype, 'render');

        new Component();

        expect(spyMethod.calledOnce).to.be.true;

        spyMethod.restore();
    });

    it('should invoke render when added new props', () => {
        const newValue = 'New Hello World';

        const component = new Component({ text: 'Hello World' });

        const fun = stub(component, 'render').returns('<div></div>');
        component.setProps({ text: newValue });
        expect(fun.calledOnce).to.be.true;
    });

    it('should init children', () => {
        const childrenText = 'New Hello World';

        const component = new Component({
            text: 'Hello World',
            Children: new ChildrenComponent({ text: childrenText })
        });

        const elementText = component.element.querySelector('article')?.textContent;

        expect(elementText).to.eq(childrenText);
    });

    it('should update children', () => {
        const childrenText = 'children';

        const component = new Component({
            text: 'Hello World',
            Children: new ChildrenComponent({ text: 'New Hello World' })
        });

        component.setChildren({ Children: new ChildrenComponent({ text: childrenText }) });

        const elementText = component.element.querySelector('article')?.textContent;

        expect(elementText).to.eq(childrenText);
    });

    it('should make display static', () => {
        const component = new Component({
            text: 'Hello World'
        });

        component.show();

        expect(component.element.style.display).to.eq('');
    });

    it('should make display none', () => {
        const component = new Component({
            text: 'Hello World'
        });

        component.hide();

        expect(component.element.style.display).to.eq('none');
    });

    it('should set events', () => {
        const clickStub = stub();

        const component = new Component({
            events: {
                click: clickStub
            }
        });

        const event = new MouseEvent('click');
        component.element.dispatchEvent(event);

        expect(clickStub.calledOnce).to.be.true;
    });
});
