import { Page5xx } from './index.ts';
import Block from '../../../../utils/block/block.ts';
import ClickableText from '../../../../components/clickable-text/clickable-text.ts';
import { Router } from '../../../../utils/routing/router.ts';

export default class Page5xxComponent extends Block {
    router: Router;

    constructor() {
        super({
            TextRedirect: new ClickableText({
                class: 'error-window-redirect',
                text: 'На главную',
                events: {
                    click: () => {
                        this.router.go('/');
                    }
                }
            })
        });

        this.router = new Router('#app');
    }

    render(): string {
        return Page5xx;
    }
}
