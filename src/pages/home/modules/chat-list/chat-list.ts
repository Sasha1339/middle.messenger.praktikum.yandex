import Block from '../../../../utils/block/block.ts';
import { ChatListModel } from '../../utils/model.ts';
import MessageComponent from '../message/message.ts';

export default class ChatListComponent extends Block {
    constructor(chat: ChatListModel[], users: Map<number, string>, me: number) {
        super(
            Object.fromEntries(
                chat.map((item, index) => [
                    `Message${index}`,
                    new MessageComponent(item, users.get(item.user_id) ?? '', me)
                ])
            )
        );
    }

    render(): string {
        return `<section class="home__chat-list">${this.buildTemplate()}</section>`;
    }

    buildTemplate(): string {
        let result = '';
        for (let i = 0; i < Object.keys(this._children).length; i++) {
            result += `{{{ Message${i} }}}\n`;
        }
        return result;
    }
}
