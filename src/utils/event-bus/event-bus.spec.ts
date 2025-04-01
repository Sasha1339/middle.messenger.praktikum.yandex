import { stub } from 'sinon';
import { expect } from 'chai';
import EventBus from './event-bus.ts';

describe('EventBus', () => {
    const Event1 = 'testEvent1';
    const Event2 = 'testEvent2';
    let eventBus: EventBus;

    beforeEach(() => {
        eventBus = new EventBus();
    });

    it('should subscribe on event', () => {
        const handler = stub();
        const args = ['arg1', 'arg2'];

        eventBus.on(Event1, handler);

        eventBus.emit(Event1, ...args);

        expect(handler.calledOnceWith(...args)).to.be.true;
    });

    it('should be work only own event', () => {
        const handler1 = stub();
        const handler2 = stub();

        eventBus.on(Event1, handler1);
        eventBus.on(Event2, handler2);

        eventBus.emit(Event1);

        expect(handler1.calledOnce).to.be.true;
        expect(handler2.calledOnce).to.be.false;
    });

    it('should unsubscribe from event', () => {
        const handler1 = stub();

        eventBus.on(Event1, handler1);

        eventBus.off(Event1, handler1);
        eventBus.emit(Event1);

        expect(handler1.calledOnce).to.be.false;
    });
});
