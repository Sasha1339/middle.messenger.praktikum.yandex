import { Dialog } from './index.ts';
import Block from '../../../../utils/block/block.ts';
import { ChatModel } from '../../utils/model.ts';
import avatar from '../../../../assets/image/avatar.jpg';

export default class DialogComponent extends Block {
    constructor(dialog: ChatModel, clickEvent: (element: HTMLElement) => void) {
        super({
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
