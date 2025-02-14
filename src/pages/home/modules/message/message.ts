import Block from '../../../../utils/block/block.ts';
import { MessageModel } from '../../utils/message-model.ts';
import { Message } from './index.ts';

export default class MessageComponent extends Block {
    constructor(message: MessageModel) {
        super({
            message: message.message,
            side: message.side
        });
    }

    render(): string {
        return Message;
    }
}
