import { ErrorPage } from './index.ts';
import Page5xxComponent from './modules/page-5xx/page-5xx.ts';
import Block from '../../utils/block/block.ts';
import Page4xxComponent from './modules/page-4xx/page-4xx.ts';

export default class ErrorComponent extends Block {
    constructor(type: '4xx' | '5xx') {
        super({
            ErrorComponent: type === '4xx' ? new Page4xxComponent() : new Page5xxComponent()
        });
    }

    render(): string {
        return ErrorPage;
    }
}
