import { Dialog } from './index.ts';
import Block from '../../../../utils/block/block.ts';
import { DialogModel } from '../../utils/dialog-model.ts';

export default class DialogComponent extends Block {
    constructor(dialog: DialogModel, clickEvent: (element: HTMLElement) => void) {
        super({
            image: dialog.image,
            name: dialog.name,
            message: dialog.message,
            lastUpdate: dialog.lastUpdate,
            countMessages: dialog.countMessages,
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
