import Block from '../../../../utils/block/block.ts';
import DialogComponent from '../dialog/dialog.ts';
import { ChatModel } from '../../utils/model.ts';

export default class DialogListComponent extends Block {
    constructor(
        allDialogs: ChatModel[],
        clickEvent: (element: HTMLElement) => void,
        deleteEvent: (chatID: number) => void,
        usersEvent: (chatID: number) => void
    ) {
        super(
            Object.fromEntries(
                allDialogs.map((item, index) => [
                    `Dialog${index}`,
                    new DialogComponent(item, clickEvent, deleteEvent, usersEvent)
                ])
            )
        );
    }

    render(): string {
        return `<section class="home__dialog-list">${this.buildTemplate()}</section>`;
    }

    buildTemplate(): string {
        let result = '';
        for (let i = 0; i < Object.keys(this._children).length; i++) {
            result += `{{{ Dialog${i} }}}\n`;
        }
        return result;
    }
}
