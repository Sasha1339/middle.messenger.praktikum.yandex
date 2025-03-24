import Block from '../../../../utils/block/block.ts';
import { ChatListModel } from '../../utils/model.ts';
import { Message } from './index.ts';

export default class MessageComponent extends Block {
    constructor(message: ChatListModel, name: string, me: number) {
        super({
            user_name: name,
            message: message.content,
            side: message.user_id === me ? 'me' : 'companion'
        });
    }

    render(): string {
        return Message;
    }
}
