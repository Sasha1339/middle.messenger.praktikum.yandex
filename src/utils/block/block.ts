import EventBus from '../event-bus/event-bus.ts';
import { v4 as uuidv4 } from 'uuid';
import Handlebars from 'handlebars';

export default class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
        COMPONENT_LOADED: 'flow:component-loaded'
    };

    _element!: HTMLElement;
    _props: { events?: Record<string, () => void> };
    _eventBus: EventBus;
    _id: string = '';
    _children: Record<string, Block> = {};
    _isLoaded: boolean = false;
    _classesChildren: Map<number, string> = new Map();

    constructor(propsAndChildren: Record<string, unknown> = {}) {
        const { children, props } = this._getChildren(propsAndChildren);
        this._children = children;

        const eventBus = new EventBus();

        this._id = uuidv4();

        this._props = this._makePropsProxy({ ...props, __id: this._id });

        this._eventBus = eventBus;

        this._registerEvents(eventBus);
        this._eventBus.emit(Block.EVENTS.INIT);
    }

    get id() {
        return this._id;
    }

    _getChildren(propsAndChildren: object) {
        const children: Record<string, Block> = {};
        const props: Record<string, unknown> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    eventBus(): EventBus {
        return this._eventBus;
    }

    _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.COMPONENT_LOADED, this.isLoaded.bind(this));
    }

    isLoaded(): void {}

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    get element() {
        return this._element;
    }

    _render() {
        this._classesChildren = new Map();
        if (this._element) {
            for (let i = 0; i < this._element.childNodes.length; i++) {
                if (
                    (this._element.childNodes[i] as HTMLElement).classList &&
                    (this._element.childNodes[i] as HTMLElement).classList.length !== 0
                ) {
                    this._classesChildren.set(i, (this._element.childNodes[i] as HTMLElement).className);
                }
            }
        }

        const propsAndStubs: Record<string, unknown> = { ...this._props };

        Object.entries(this._children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
        });

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        Object.values(this._children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        const newElement = fragment.content.firstElementChild as HTMLElement;

        if (this._element && this._element.parentElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;

        if (this._element && this._classesChildren.size > 0) {
            for (let i = 0; i < this._element.childNodes.length; i++) {
                (this._element.childNodes[i] as HTMLElement).className = this._classesChildren.get(i)!;
            }
        }

        this._removeEvents();
        this._addEvents();

        if (!this._isLoaded) {
            this._isLoaded = true;
            this._eventBus.emit(Block.EVENTS.COMPONENT_LOADED);
        }
    }

    render(): string {
        return `<div></div>`;
    }

    getContent() {
        return this.element;
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    dispatchComponentDidUpdate() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    _componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }

        this._render();
    }

    private _isEqual(obj1: Record<string, unknown> = {}, obj2: Record<string, unknown> = {}): boolean {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) return false;

        return keys1.every((key) => {
            const val1 = obj1[key];
            const val2 = obj2[key];

            if (typeof val1 === 'object' && typeof val2 === 'object') {
                return this._isEqual(val1 as Record<string, unknown>, val2 as Record<string, unknown>);
            }

            return val1 === val2;
        });
    }

    componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>): boolean {
        return !this._isEqual(oldProps, newProps);
    }

    _makePropsProxy(props: object): { events?: Record<string, () => void> } {
        return new Proxy(props, {
            get(target: Record<string, unknown>, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Record<string, unknown>, prop: string, value) {
                target[prop] = value;
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

    get props(): Record<string, unknown> {
        return this._props;
    }

    _addEvents() {
        const { events } = this._props;

        if (events) {
            Object.keys(events).forEach((eventName) => {
                this._element.addEventListener(eventName, events[eventName]);
            });
        }
    }

    _removeEvents() {
        const { events } = this._props;

        if (events) {
            Object.keys(events).forEach((eventName) => {
                this._element.removeEventListener(eventName, events[eventName]);
            });
        }
    }

    setProps = (nextProps: Record<string, unknown>) => {
        if (!nextProps) {
            return;
        }

        const oldProps = { ...this._props };
        Object.assign(this._props, nextProps);

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this._props);
    };

    setChildren = (nextChildren: Record<string, unknown>) => {
        if (!nextChildren) {
            return;
        }

        const oldChildren = { ...this._children };
        Object.assign(this._children, nextChildren);

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldChildren, this._children);
    };

    _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName) as HTMLTemplateElement;
        element.setAttribute('data-id', this._id);
        return element;
    }

    show() {
        this.getContent().style.display = '';
    }

    hide() {
        this.getContent().style.display = 'none';
    }
}
