import { Dialog } from './index.ts';
import Block from '../../../../utils/block/block.ts';
import { ChatModel } from '../../utils/model.ts';
import avatar from '../../../../assets/image/avatar.jpg';
import ButtonImage from '../../../../components/button-image/button-image.ts';
import deleteChat from '../../../../assets/svg/card.svg';

export default class DialogComponent extends Block {
    constructor(
        dialog: ChatModel,
        clickEvent: (element: HTMLElement) => void,
        deleteEvent: (chatID: number) => void
    ) {
        super({
            ButtonDelete: new ButtonImage({
                class: 'home__title-settings',
                class_svg: 'svg__settings',
                alt: 'Удалить чат',
                src: deleteChat,
                events: {
                    click: () => {
                        deleteEvent(dialog.id);
                    }
                }
            }),
            avatar: dialog.avatar ?? avatar,
            title: dialog.title,
            lastMessage: dialog.last_message,
            lastUpdate: dialog.last_message ? dialog.last_message.time : '',
            unreadCount: dialog.unread_count,
            events: {
                click: () => {
                    clickEvent(this._element);
                }
            }
        });
    }

    render(): string {
        return Dialog;
    }

    blurElement(event: Event): void {
        if (this._element !== (event.target as HTMLElement)) {
            this._element.classList.remove('dialog_selected');
        }
    }
}
