import Block from '../../../../utils/block/block.ts';
import { Model } from '../../utils/model.ts';
import MessageComponent from '../message/message.ts';

export default class ChatListComponent extends Block {
    constructor(chat: Model[]) {
        super(Object.fromEntries(chat.map((item, index) => [`Message${index}`, new MessageComponent(item)])));
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
