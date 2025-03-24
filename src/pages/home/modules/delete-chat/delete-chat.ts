import Block from '../../../../utils/block/block.ts';
import Button from '../../../../components/button/buttons.ts';
import { DeleteChatWindow } from './index.ts';
import ClickableText from '../../../../components/clickable-text/clickable-text.ts';
export default class DeleteChat extends Block {
    constructor(events: { clickOnAccept: () => void; clickOnCancel: () => void }) {
        super({
            ButtonAccept: new Button({
                label: 'Удалить чат',
                class: 'window__button-edit-password',
                events: {
                    click: () => {
                        events.clickOnAccept();
                    }
                }
            }),
            TextCancel: new ClickableText({
                class: 'window__button-cancel',
                text: 'Отмена',
                events: {
                    click: events.clickOnCancel
                }
            })
        });
    }

    render(): string {
        return DeleteChatWindow;
    }
}
