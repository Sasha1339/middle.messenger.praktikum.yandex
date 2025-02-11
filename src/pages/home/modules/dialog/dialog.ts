import { Dialog } from './index.ts';
import Block from "../../../../utils/block/block.ts";
import {DialogModel} from "../../utils/dialog-model.ts";


export default class DialogComponent extends Block {

    constructor(dialog: DialogModel) {
        super({
            image: dialog.image,
            name: dialog.name,
            message: dialog.message,
            lastUpdate: dialog.lastUpdate,
            countMessages: dialog.countMessages
        });
    }

    render(): string {
        return Dialog;
    }

}
