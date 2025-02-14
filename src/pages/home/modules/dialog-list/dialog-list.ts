import Block from '../../../../utils/block/block.ts';
import { DialogModel } from '../../utils/dialog-model.ts';
import DialogComponent from '../dialog/dialog.ts';

export default class DialogListComponent extends Block {
    constructor(allDialogs: DialogModel[], clickEvent: (element: HTMLElement) => void) {
        super(
            Object.fromEntries(
                allDialogs.map((item, index) => [`Dialog${index}`, new DialogComponent(item, clickEvent)])
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
