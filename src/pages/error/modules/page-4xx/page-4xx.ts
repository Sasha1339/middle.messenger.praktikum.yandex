import { Page4xx } from './index.ts';
import Block from '../../../../utils/block/block.ts';
import ClickableText from '../../../../components/clickable-text/clickable-text.ts';

export default class Page4xxComponent extends Block {
    constructor() {
        super({
            TextRedirect: new ClickableText({
                class: 'error-window-redirect',
                text: 'На главную'
            })
        });
    }

    render(): string {
        return Page4xx;
    }
}
