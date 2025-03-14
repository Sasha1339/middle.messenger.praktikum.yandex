import Block from '../../../../utils/block/block.ts';
import { Model } from '../../utils/model.ts';
import { Message } from './index.ts';

export default class MessageComponent extends Block {
    constructor(message: Model) {
        super({
            message: message.message,
            side: message.side
        });
    }

    render(): string {
        return Message;
    }
}
