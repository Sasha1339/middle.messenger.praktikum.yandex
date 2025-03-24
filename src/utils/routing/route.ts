import Block from '../block/block.ts';

export class Route<Type extends Block> {
    _pathname: string;
    _blockClass: new (...args: any[]) => Type;
    _block: Type | null;
    _props: Record<string, string>;
    _params?: Record<string, unknown>;

    constructor(
        pathname: string,
        view: new () => Type,
        props: Record<string, string>,
        params?: Record<string, unknown>
    ) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
        this._params = params;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    render(): void {
        if (!this._block) {
            this._block = new this._blockClass(this._params);
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

function render(query: string, block: Block): void {
    const container = document.querySelector(query) as HTMLElement;

    container.appendChild(block.getContent());

    block.dispatchComponentDidMount();
}
