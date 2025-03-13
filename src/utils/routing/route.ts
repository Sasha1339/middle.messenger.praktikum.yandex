import Block from '../block/block.ts';

export class Route<Type extends Block> {
    _pathname: string;
    _blockClass: new () => Type;
    _block: Type | null;
    _props: Record<string, string>;

    constructor(pathname: string, view: new () => Type, props: Record<string, string>) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
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
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

function render(query: string, block: Block) {
    const container = document.querySelector(query) as HTMLElement;

    //container.childNodes.forEach((e) => e.remove());

    container.appendChild(block.getContent());

    block.dispatchComponentDidMount();

    return container;
}
