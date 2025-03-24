import { Page4xx } from './index.ts';
import Block from '../../../../utils/block/block.ts';
import ClickableText from '../../../../components/clickable-text/clickable-text.ts';
import { Router } from '../../../../utils/routing/router.ts';

export default class Page4xxComponent extends Block {
    router: Router;

    constructor(code: string) {
        super({
            TextRedirect: new ClickableText({
                class: 'error-window-redirect',
                text: code === '401' ? 'На главную' : 'Вернуться',
                events: {
                    click: () => {
                        if (code === '404') {
                            this.router.go('/');
                        } else {
                            this.router.back();
                        }
                    }
                }
            }),
            code: code,
            text: code === '401' ? 'Ошибка авторизации' : 'Упс, не туда завернули'
        });

        this.router = new Router('#app');
    }

    render(): string {
        return Page4xx;
    }
}
